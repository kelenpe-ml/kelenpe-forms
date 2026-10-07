import type { FormAnswers, Question } from "./types.ts";

export const MAX_TEXT_LENGTH = 5000;
export const MAX_CHOICES = 20;
export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const MAX_TOTAL_FILE_BYTES = 3 * 1024 * 1024;
export const RATING_MIN = 1;
export const RATING_MAX = 5;

export const ALLOWED_FILE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "text/csv": "csv",
  "text/plain": "txt",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

export type UploadedFile = { name: string; type: string; data: string };

export type EmailAttachment = { filename: string; content: Buffer };

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_TEXT_LENGTH) : "";
}

function cleanValue(question: Question, value: unknown): string | string[] {
  if (question.type === "multi_choice" || question.type === "feature_priority") {
    if (!Array.isArray(value)) return [];
    return value
      .filter((item): item is string => typeof item === "string")
      .slice(0, MAX_CHOICES)
      .map((item) => item.slice(0, MAX_TEXT_LENGTH));
  }

  const text = cleanText(value).trim();

  if (question.type === "number") {
    return /^\d{1,12}([.,]\d{1,3})?$/.test(text) ? text : "";
  }
  if (question.type === "rating") {
    const rating = Number(text);
    const valid =
      Number.isInteger(rating) && rating >= RATING_MIN && rating <= RATING_MAX;
    return valid ? text : "";
  }
  return cleanText(value);
}

/** Garde uniquement les réponses des questions connues, avec un type et une taille valides. */
export function sanitizeAnswers(
  answers: Record<string, unknown>,
  questions: Question[],
): FormAnswers {
  const clean: FormAnswers = {};
  for (const question of questions) {
    if (question.type === "file") continue;
    clean[question.id] = cleanValue(question, answers[question.id]);
  }
  return clean;
}

function safeFileName(name: unknown): string {
  const raw = typeof name === "string" ? name : "fichier";
  return raw.replace(/[^\w.\-() ]+/g, "_").slice(0, 80) || "fichier";
}

export type PreparedAttachments = {
  attachments: EmailAttachment[];
  answers: FormAnswers;
  error?: string;
};

/** Valide les fichiers reçus, en fait des pièces jointes et note leur nom dans les réponses. */
export function prepareAttachments(
  files: Record<string, UploadedFile>,
  questions: Question[],
  answers: FormAnswers,
): PreparedAttachments {
  const fileQuestionIds = new Set(
    questions.filter((q) => q.type === "file").map((q) => q.id),
  );
  const attachments: EmailAttachment[] = [];
  const nextAnswers: FormAnswers = { ...answers };
  let totalBytes = 0;

  for (const [id, file] of Object.entries(files)) {
    if (!fileQuestionIds.has(id)) {
      return { attachments: [], answers, error: "Fichier inattendu." };
    }
    if (!file || typeof file.data !== "string" || !ALLOWED_FILE_TYPES[file.type]) {
      return {
        attachments: [],
        answers,
        error: "Type de fichier non accepté (photo, PDF, CSV ou Excel).",
      };
    }

    const content = Buffer.from(file.data, "base64");
    totalBytes += content.length;
    if (content.length > MAX_FILE_BYTES || totalBytes > MAX_TOTAL_FILE_BYTES) {
      return { attachments: [], answers, error: "Fichier trop volumineux." };
    }

    const name = safeFileName(file.name);
    attachments.push({ filename: `${id.split("_")[0]}-${name}`, content });
    nextAnswers[id] = `Fichier joint : ${name}`;
  }

  return { attachments, answers: nextAnswers };
}
