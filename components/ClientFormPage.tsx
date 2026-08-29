"use client";

import { useMemo, useState } from "react";
import {
  buildInitialAnswers,
  FormQuestion,
} from "@/components/FormQuestion";
import { KelenpeLogo } from "@/components/KelenpeLogo";
import { mergeAnswersWithDetails } from "@/lib/formatAnswer";
import type { ClientForm, FormAnswers } from "@/lib/types";

type ClientFormPageProps = {
  form: ClientForm;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function ClientFormPage({ form }: ClientFormPageProps) {
  const initialAnswers = useMemo(() => buildInitialAnswers(form), [form]);
  const [answers, setAnswers] = useState<FormAnswers>(initialAnswers);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const mergedAnswers = mergeAnswersWithDetails(answers, details);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          answers: mergedAnswers,
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
            "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
        );
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage(
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.",
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
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

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
