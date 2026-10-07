import assert from "node:assert/strict";
import { test } from "node:test";
import { mergeAnswersWithDetails } from "./formatAnswer.ts";
import {
  MAX_FILE_BYTES,
  prepareAttachments,
  sanitizeAnswers,
} from "./submission.ts";
import type { Question } from "./types.ts";

const questions: Question[] = [
  { id: "e1", type: "multi_choice", label: "E1", detailOption: "Autre" },
  { id: "photo", type: "file", label: "Photo" },
  { id: "n", type: "number", label: "N" },
  { id: "r", type: "rating", label: "R" },
  { id: "s", type: "short_text", label: "S" },
];
const b64 = (text: string) => Buffer.from(text).toString("base64");

test("fusionne la précision « Autre » dans la valeur choisie", () => {
  const merged = mergeAnswersWithDetails(
    { e1: ["Tickets", "Autre"] },
    { e1: "Bons de livraison" },
    questions,
  );
  assert.deepEqual(merged.e1, ["Tickets", "Autre : Bons de livraison"]);
});

test("ignore la précision si « Autre » n'est pas coché", () => {
  const merged = mergeAnswersWithDetails({ e1: ["Tickets"] }, { e1: "x" }, questions);
  assert.deepEqual(merged.e1, ["Tickets"]);
});

test("garde seulement les réponses des questions connues et coupe les textes trop longs", () => {
  const clean = sanitizeAnswers(
    { s: "x".repeat(10000), inconnu: "a", e1: ["Tickets", 3 as unknown as string] },
    questions,
  );
  assert.equal((clean.s as string).length, 5000);
  assert.equal("inconnu" in clean, false);
  assert.deepEqual(clean.e1, ["Tickets"]);
});

test("rejette un nombre ou une note hors plage", () => {
  const clean = sanitizeAnswers({ n: "abc", r: "9" }, questions);
  assert.equal(clean.n, "");
  assert.equal(clean.r, "");
  assert.deepEqual(sanitizeAnswers({ n: "120", r: "4" }, questions), {
    ...clean,
    n: "120",
    r: "4",
  });
});

test("prépare une pièce jointe valide et remplace la réponse par son nom", () => {
  const result = prepareAttachments(
    { photo: { name: "ecran.jpg", type: "image/jpeg", data: b64("jpegdata") } },
    questions,
    {},
  );
  assert.equal(result.attachments.length, 1);
  assert.equal(result.attachments[0].filename, "photo-ecran.jpg");
  assert.equal(result.answers.photo, "Fichier joint : ecran.jpg");
  assert.equal(result.error, undefined);
});

test("refuse un type de fichier non autorisé", () => {
  const result = prepareAttachments(
    { photo: { name: "a.exe", type: "application/x-msdownload", data: b64("x") } },
    questions,
    {},
  );
  assert.ok(result.error);
});

test("refuse un fichier trop gros", () => {
  const big = Buffer.alloc(MAX_FILE_BYTES + 1).toString("base64");
  const result = prepareAttachments(
    { photo: { name: "a.jpg", type: "image/jpeg", data: big } },
    questions,
    {},
  );
  assert.ok(result.error);
});

test("refuse un fichier envoyé pour une question qui n'est pas de type fichier", () => {
  const result = prepareAttachments(
    { s: { name: "a.jpg", type: "image/jpeg", data: b64("x") } },
    questions,
    {},
  );
  assert.ok(result.error);
});
