import type { FormAnswers, Question } from "./types.ts";

/** Indique si une question conditionnelle (`showIf`) doit être affichée et envoyée. */
export function isQuestionVisible(question: Question, answers: FormAnswers): boolean {
  const rule = question.showIf;
  if (!rule) return true;
  const value = answers[rule.questionId];
  const rating = Number(typeof value === "string" ? value : "");
  if (!Number.isInteger(rating) || rating < 1) return false;
  if (rule.min !== undefined && rating < rule.min) return false;
  if (rule.max !== undefined && rating > rule.max) return false;
  return true;
}

/** Vide les réponses des questions masquées, pour ne rien envoyer qui n'a pas été montré. */
export function clearHiddenAnswers(answers: FormAnswers, questions: Question[]): FormAnswers {
  const next: FormAnswers = { ...answers };
  for (const question of questions) {
    if (!isQuestionVisible(question, answers)) {
      next[question.id] = Array.isArray(next[question.id]) ? [] : "";
    }
  }
  return next;
}
