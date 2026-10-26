import { test } from "node:test";
import assert from "node:assert/strict";
import { clearHiddenAnswers, findMissingRequired, isQuestionVisible } from "./visibility.ts";
import { sanitizeAnswers } from "./submission.ts";
import type { Question } from "./types.ts";

const note: Question = { id: "note", type: "rating", label: "Note" };
const bas: Question = { id: "bas", type: "text", label: "Bas", showIf: { questionId: "note", max: 3 } };
const haut: Question = { id: "haut", type: "text", label: "Haut", showIf: { questionId: "note", min: 4 } };

test("une question conditionnelle est masquée tant qu'aucune note n'est donnée", () => {
  assert.equal(isQuestionVisible(bas, { note: "" }), false);
  assert.equal(isQuestionVisible(haut, { note: "" }), false);
});

test("les seuils min et max sont inclusifs", () => {
  assert.equal(isQuestionVisible(bas, { note: "3" }), true);
  assert.equal(isQuestionVisible(bas, { note: "4" }), false);
  assert.equal(isQuestionVisible(haut, { note: "4" }), true);
  assert.equal(isQuestionVisible(haut, { note: "1" }), false);
});

test("les réponses des questions masquées sont vidées", () => {
  const out = clearHiddenAnswers({ note: "5", bas: "texte", haut: "super" }, [note, bas, haut]);
  assert.deepEqual(out, { note: "5", bas: "", haut: "super" });
});

test("le serveur ignore une réponse à une question masquée", () => {
  const out = sanitizeAnswers({ note: "2", bas: "lent", haut: "rien" }, [note, bas, haut]);
  assert.deepEqual(out, { note: "2", bas: "lent", haut: "" });
});

test("une note obligatoire vide est détectée, une note valide est acceptée", () => {
  const required: Question = { ...note, required: true };
  assert.equal(findMissingRequired([required], { note: "" })?.id, "note");
  assert.equal(findMissingRequired([required], sanitizeAnswers({ note: "9" }, [required]))?.id, "note");
  assert.equal(findMissingRequired([required], { note: "4" }), undefined);
});
