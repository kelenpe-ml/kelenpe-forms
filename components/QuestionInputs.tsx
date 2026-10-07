"use client";

import { useRef, useState } from "react";
import { prepareFileForUpload } from "@/lib/clientFiles";
import type { UploadedFile } from "@/lib/submission";
import type { Question } from "@/lib/types";

const FIELD_CLASS =
  "w-full min-h-12 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-kelenpe focus:outline-none focus:ring-2 focus:ring-kelenpe/20";
const CHOICE_CLASS =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 transition-colors hover:border-kelenpe/40 has-checked:border-kelenpe has-checked:bg-kelenpe/5";
const RATING_VALUES = [1, 2, 3, 4, 5];

export function MultiChoiceInput({
  question,
  value,
  detail,
  onChange,
  onDetailChange,
}: {
  question: Question;
  value: string[];
  detail: string;
  onChange: (value: string[]) => void;
  onDetailChange: (detail: string) => void;
}) {
  const toggle = (option: string) =>
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option],
    );

  return (
    <div className="space-y-2">
      {question.options?.map((option) => (
        <label key={option} className={CHOICE_CLASS}>
          <input
            type="checkbox"
            checked={value.includes(option)}
            onChange={() => toggle(option)}
            className="h-5 w-5 shrink-0 accent-kelenpe"
          />
          <span className="text-base leading-snug text-gray-800">{option}</span>
        </label>
      ))}
      {question.detailOption && value.includes(question.detailOption) && (
        <input
          type="text"
          aria-label={`Précision : ${question.detailOption}`}
          value={detail}
          onChange={(e) => onDetailChange(e.target.value)}
          placeholder={question.detailPlaceholder}
          className={FIELD_CLASS}
        />
      )}
    </div>
  );
}

export function ShortTextInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      id={question.id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className={FIELD_CLASS}
    />
  );
}

export function NumberInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      id={question.id}
      type="number"
      inputMode="numeric"
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className={FIELD_CLASS}
    />
  );
}

export function RatingInput({
  questionLabel,
  value,
  onChange,
}: {
  questionLabel: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={questionLabel} className="grid grid-cols-5 gap-2">
      {RATING_VALUES.map((rating) => {
        const selected = value === String(rating);
        return (
          <button
            key={rating}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected ? "" : String(rating))}
            className={`min-h-12 rounded-lg border text-lg font-medium transition-colors ${
              selected
                ? "border-kelenpe bg-kelenpe text-white"
                : "border-gray-200 bg-white text-gray-800 hover:border-kelenpe/40"
            }`}
          >
            {rating}
          </button>
        );
      })}
    </div>
  );
}

export function FileInput({
  question,
  file,
  onChange,
}: {
  question: Question;
  file: UploadedFile | undefined;
  onChange: (file: UploadedFile | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handlePick = async (picked: File | undefined) => {
    if (!picked) return;
    setBusy(true);
    setError(null);
    const result = await prepareFileForUpload(picked);
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onChange(result.file);
  };

  const clear = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        id={question.id}
        type="file"
        accept="image/*,.pdf,.csv,.xls,.xlsx,.txt"
        onChange={(e) => handlePick(e.target.files?.[0])}
        className="w-full min-h-12 rounded-lg border border-dashed border-gray-300 bg-white p-2.5 text-base text-gray-700 file:mr-3 file:min-h-10 file:rounded-md file:border-0 file:bg-kelenpe file:px-4 file:py-2 file:text-base file:text-white"
      />
      {busy && <p className="text-sm text-gray-500">Préparation du fichier…</p>}
      {file && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm text-gray-700">
          <span className="min-w-0 break-words">Prêt à envoyer : {file.name}</span>
          <button
            type="button"
            onClick={clear}
            className="min-h-10 shrink-0 rounded-md px-3 text-kelenpe underline"
          >
            Retirer
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
