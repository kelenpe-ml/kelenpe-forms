import assert from "node:assert/strict";
import { test } from "node:test";
import { buildResponsesCsv } from "./csv.ts";
import type { ClientForm } from "./types.ts";

const form: ClientForm = {
  slug: "t",
  clientName: "Test",
  projectName: "Test",
  intro: "",
  sections: [
    {
      title: "S",
      questions: [
        { id: "a", code: "A1", type: "multi_choice", label: "Qui ?" },
        { id: "b", type: "short_text", label: "Nom" },
      ],
    },
  ],
};
const submittedAt = new Date("2026-10-07T10:00:00Z");

test("produit un en-tête lisible et une seule ligne par réponse", () => {
  const csv = buildResponsesCsv(form, { a: ["Patron", "Employé"], b: "Moussa" }, submittedAt);
  const lines = csv.replace(/^﻿/, "").trim().split("\r\n");
  assert.equal(lines.length, 2);
  assert.equal(lines[0], "Date de réception,A1 – Qui ?,Nom");
  assert.equal(lines[1], "2026-10-07T10:00:00.000Z,Patron ; Employé,Moussa");
});

test("commence par un BOM pour qu'Excel lise l'UTF-8", () => {
  assert.ok(buildResponsesCsv(form, {}, submittedAt).startsWith("﻿"));
});

test("laisse vides les champs non remplis", () => {
  const csv = buildResponsesCsv(form, {}, submittedAt).replace(/^﻿/, "");
  assert.equal(csv.trim().split("\r\n")[1], "2026-10-07T10:00:00.000Z,,");
});

test("met entre guillemets virgules, guillemets et sauts de ligne", () => {
  const csv = buildResponsesCsv(form, { a: [], b: 'dit "oui",\npuis non' }, submittedAt);
  assert.ok(csv.includes('"dit ""oui"",\npuis non"'));
});

test("neutralise les formules de tableur", () => {
  const csv = buildResponsesCsv(form, { b: "=HYPERLINK(\"x\")" }, submittedAt);
  assert.ok(csv.includes("'=HYPERLINK"));
});

test("ne touche pas aux nombres négatifs ni aux numéros commençant par +", () => {
  const csv = buildResponsesCsv(form, { b: "-5" }, submittedAt);
  assert.ok(csv.endsWith(",-5\r\n"));
  const phone = buildResponsesCsv(form, { b: "+223 70 00 00 00" }, submittedAt);
  assert.ok(phone.endsWith(",+223 70 00 00 00\r\n"));
});
