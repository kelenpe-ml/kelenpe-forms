"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  buildInitialAnswers,
  FormQuestion,
} from "@/components/FormQuestion";
import { KelenpeLogo } from "@/components/KelenpeLogo";
import { mergeAnswersWithDetails } from "@/lib/formatAnswer";
import type { UploadedFile } from "@/lib/submission";
import type { ClientForm, FormAnswers } from "@/lib/types";

type ClientFormPageProps = {
  form: ClientForm;
};

type ClientFormBodyProps = ClientFormPageProps & {
  initialDraft: Draft | null;
  persistDraft: boolean;
};

type SubmitState = "idle" | "loading" | "success" | "error";

type Draft = { answers: FormAnswers; details: Record<string, string> };

const DRAFT_KEY_PREFIX = "kelenpe-draft:";
const DRAFT_SAVE_DELAY_MS = 400;

function readDraft(slug: string): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY_PREFIX + slug);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function writeDraft(slug: string, draft: Draft | null) {
  try {
    if (draft) {
      window.localStorage.setItem(DRAFT_KEY_PREFIX + slug, JSON.stringify(draft));
    } else {
      window.localStorage.removeItem(DRAFT_KEY_PREFIX + slug);
    }
  } catch {
    // Stockage indisponible (navigation privée, quota) : le formulaire reste utilisable sans brouillon.
  }
}

const subscribeNever = () => () => {};

/** Le brouillon vit dans le navigateur : on ne le lit qu'après l'hydratation. */
export function ClientFormPage({ form }: ClientFormPageProps) {
  const isBrowser = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  return (
    <ClientFormBody
      key={isBrowser ? "browser" : "server"}
      form={form}
      initialDraft={isBrowser ? readDraft(form.slug) : null}
      persistDraft={isBrowser}
    />
  );
}

function ClientFormBody({
  form,
  initialDraft,
  persistDraft,
}: ClientFormBodyProps) {
  const [answers, setAnswers] = useState<FormAnswers>(() => ({
    ...buildInitialAnswers(form),
    ...initialDraft?.answers,
  }));
  const [details, setDetails] = useState<Record<string, string>>(
    initialDraft?.details ?? {},
  );
  const [files, setFiles] = useState<Record<string, UploadedFile>>({});
  const draftRestored = initialDraft !== null;
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const questions = useMemo(
    () => form.sections.flatMap((section) => section.questions),
    [form],
  );

  useEffect(() => {
    if (!persistDraft || submitState === "success") return;
    const timer = window.setTimeout(
      () => writeDraft(form.slug, { answers, details }),
      DRAFT_SAVE_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [answers, details, persistDraft, form.slug, submitState]);

  const handleFileChange = (id: string, file: UploadedFile | undefined) => {
    setFiles((prev) => {
      const next = { ...prev };
      if (file) next[id] = file;
      else delete next[id];
      return next;
    });
  };

  const handleChange = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleDetailChange = (id: string, detail: string) => {
    setDetails((prev) => ({ ...prev, [id]: detail }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState("loading");
    setErrorMessage(null);

    const mergedAnswers = mergeAnswersWithDetails(answers, details, questions);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          answers: mergedAnswers,
          files,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitState("error");
        setErrorMessage(
          data.error ??
            "L'envoi a échoué. Vos réponses sont conservées sur cet appareil : réessayez.",
        );
        return;
      }

      writeDraft(form.slug, null);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage(
        "Impossible de contacter le serveur. Vos réponses sont conservées sur cet appareil : réessayez dès que la connexion revient.",
      );
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 border-b border-gray-100 pb-6">
        <KelenpeLogo priority />
        <p className="mt-3 text-sm text-gray-500">{form.clientName}</p>
        <h1 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
          {form.projectName}
        </h1>
        {submitState !== "success" && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {form.intro}
          </p>
        )}
      </header>

      {submitState === "success" ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
          <p className="text-lg font-medium text-gray-900">
            Merci, vos réponses ont bien été envoyées.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10 pb-24">
          {form.sections.map((section) => (
            <section key={section.title} className="space-y-6">
              <h2 className="text-lg font-semibold text-kelenpe">
                {section.title}
              </h2>

              <div className="space-y-8">
                {section.questions.map((question) => (
                  <div
                    key={question.id}
                    className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5"
                  >
                    <FormQuestion
                      question={question}
                      value={answers[question.id]}
                      detail={details[question.id]}
                      onChange={handleChange}
                      onDetailChange={handleDetailChange}
                      file={files[question.id]}
                      onFileChange={handleFileChange}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {draftRestored && !errorMessage && (
            <p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
              Brouillon retrouvé sur cet appareil. Les photos ne sont pas
              conservées : ajoutez-les de nouveau si besoin.
            </p>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {errorMessage}
            </div>
          )}

          <div className="sticky bottom-0 z-10 -mx-4 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="w-full rounded-lg bg-kelenpe px-6 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-kelenpe focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitState === "loading" ? "Envoi en cours…" : "Envoyer"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
