import type { FormAnswers } from "@/lib/types";

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
): FormAnswers {
  const merged: FormAnswers = { ...answers };

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
