import type { FormAnswers, Question } from "./types.ts";

export function formatAnswerValue(value: string | string[] | undefined): string {
  if (value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "—";
    return value.map((item) => `• ${item}`).join("\n");
  }

  return value;
}

export function mergeAnswersWithDetails(
  answers: FormAnswers,
  details: Record<string, string>,
  questions: Question[] = [],
): FormAnswers {
  const merged: FormAnswers = { ...answers };

  for (const question of questions) {
    const detail = details[question.id]?.trim();
    const value = merged[question.id];
    if (!question.detailOption || !detail) continue;

    if (Array.isArray(value) && value.includes(question.detailOption)) {
      merged[question.id] = value.map((item) =>
        item === question.detailOption ? `${item} : ${detail}` : item,
      );
    } else if (value === question.detailOption) {
      merged[question.id] = `${value} : ${detail}`;
    }
  }

  if (details.deadline?.trim()) {
    const base = typeof merged.deadline === "string" ? merged.deadline : "";
    merged.deadline = base
      ? `${base}\n\nPrécisions : ${details.deadline.trim()}`
      : details.deadline.trim();
  }

  if (details.language?.trim() && merged.language === "Autres langues") {
    merged.language = `Autres langues : ${details.language.trim()}`;
  }

  return merged;
}
