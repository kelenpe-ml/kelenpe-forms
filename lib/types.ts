export type Question = {
  id: string;
  type: "single_choice" | "text" | "feature_priority";
  label: string;
  options?: string[];
  alert?: string;
  placeholder?: string;
};

export type Section = {
  title: string;
  questions: Question[];
};

export type ClientForm = {
  slug: string;
  clientName: string;
  projectName: string;
  intro: string;
  sections: Section[];
};

export type FormAnswers = Record<string, string | string[]>;
