export type QuestionType =
  | "single_choice"
  | "multi_choice"
  | "text"
  | "short_text"
  | "number"
  | "rating"
  | "file"
  | "feature_priority";

export type Question = {
  id: string;
  type: QuestionType;
  label: string;
  /** Repère court affiché devant la question et dans l'en-tête du CSV (ex. « B1 »). */
  code?: string;
  options?: string[];
  alert?: string;
  placeholder?: string;
  /** Note affichée à la personne qui remplit, jamais envoyée dans les réponses. */
  hostNote?: string;
  /** Option qui ouvre un champ de précision (multi_choice). */
  detailOption?: string;
  detailPlaceholder?: string;
  /** Affichage de la note (type « rating ») : chiffres (défaut) ou étoiles. */
  ratingStyle?: "numbers" | "stars";
  /** La question n'apparaît que si la note donnée à `questionId` est dans [min, max]. */
  showIf?: { questionId: string; min?: number; max?: number };
  /** Réponse obligatoire : l'envoi est refusé tant qu'elle est vide. */
  required?: boolean;
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
