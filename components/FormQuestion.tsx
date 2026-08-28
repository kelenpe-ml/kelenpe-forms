"use client";

import type { FormAnswers, Question } from "@/lib/types";

type FormQuestionProps = {
  question: Question;
  value: string | string[] | undefined;
  detail: string | undefined;
  onChange: (id: string, value: string | string[]) => void;
  onDetailChange: (id: string, detail: string) => void;
};

function AlertBox({ message }: { message: string }) {
  return (
    <div className="mt-3 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
      <span className="shrink-0 text-base leading-none" aria-hidden="true">
        ⚠
      </span>
      <p>{message}</p>
    </div>
  );
}

export function FormQuestion({
  question,
  value,
  detail,
  onChange,
  onDetailChange,
}: FormQuestionProps) {
  const showDetailField =
    question.placeholder &&
    (question.id === "deadline" ||
      (question.id === "language" && value === "Autres langues"));

  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-medium text-gray-900">
        {question.label}
      </legend>

      {question.type === "single_choice" && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 transition-colors hover:border-kelenpe/40 has-checked:border-kelenpe has-checked:bg-kelenpe/5"
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={() => onChange(question.id, option)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-kelenpe"
              />
              <span className="text-sm leading-relaxed text-gray-800">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}

      {question.type === "text" && (
        <textarea
          id={question.id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-kelenpe focus:outline-none focus:ring-2 focus:ring-kelenpe/20"
        />
      )}

      {question.type === "feature_priority" && question.options && (
        <FeaturePriorityInput
          questionId={question.id}
          options={question.options}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {showDetailField && (
        <textarea
          id={`${question.id}-detail`}
          value={detail ?? ""}
          onChange={(e) => onDetailChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-kelenpe focus:outline-none focus:ring-2 focus:ring-kelenpe/20"
        />
      )}

      {question.alert && <AlertBox message={question.alert} />}
    </fieldset>
  );
}

function FeaturePriorityInput({
  questionId,
  options,
  value,
  onChange,
}: {
  questionId: string;
  options: string[];
  value: string[];
  onChange: (id: string, value: string | string[]) => void;
}) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(
        questionId,
        value.filter((item) => item !== option),
      );
      return;
    }

    if (value.length >= 3) return;
    onChange(questionId, [...value, option]);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">
        {value.length}/3 sélectionnée{value.length > 1 ? "s" : ""}
      </p>
      {options.map((option) => {
        const checked = value.includes(option);
        const disabled = !checked && value.length >= 3;

        return (
          <label
            key={option}
            className={`flex items-start gap-3 rounded-lg border px-3 py-3 transition-colors ${
              disabled
                ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
                : "cursor-pointer border-gray-200 bg-white hover:border-kelenpe/40 has-checked:border-kelenpe has-checked:bg-kelenpe/5"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(option)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-kelenpe"
            />
            <span className="text-sm leading-relaxed text-gray-800">
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function buildInitialAnswers(form: {
  sections: { questions: Question[] }[];
}): FormAnswers {
  const answers: FormAnswers = {};

  for (const section of form.sections) {
    for (const question of section.questions) {
      answers[question.id] = question.type === "feature_priority" ? [] : "";
    }
  }

  return answers;
}
