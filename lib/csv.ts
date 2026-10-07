import type { ClientForm, FormAnswers } from "./types.ts";

const BOM = "﻿";
const LINE_BREAK = "\r\n";
const MULTI_VALUE_SEPARATOR = " ; ";

// Un tableur exécute une cellule qui commence par = ou @, ou par +/- suivi d'autre chose qu'un chiffre.
const FORMULA_START = /^(?:[=@\t\r]|[+-][^\d\s(.])/;

function neutralizeFormula(value: string): string {
  return FORMULA_START.test(value) ? `'${value}` : value;
}

function escapeCell(value: string): string {
  const safe = neutralizeFormula(value);
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function cellValue(value: string | string[] | undefined): string {
  if (value === undefined) return "";
  return Array.isArray(value) ? value.join(MULTI_VALUE_SEPARATOR) : value;
}

export function buildResponsesCsv(
  form: ClientForm,
  answers: FormAnswers,
  submittedAt: Date,
): string {
  const questions = form.sections.flatMap((section) => section.questions);

  const header = [
    "Date de réception",
    ...questions.map((q) => (q.code ? `${q.code} – ${q.label}` : q.label)),
  ];
  const row = [
    submittedAt.toISOString(),
    ...questions.map((q) => cellValue(answers[q.id])),
  ];

  return (
    BOM +
    [header, row]
      .map((cells) => cells.map(escapeCell).join(","))
      .join(LINE_BREAK) +
    LINE_BREAK
  );
}
