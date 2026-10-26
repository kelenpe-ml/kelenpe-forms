import type { ClientForm } from "@/lib/types";

export const TRACOM_AVIS_SLUG = "tracom-avis-98e34967d4";

export const tracomAvis: ClientForm = {
  slug: TRACOM_AVIS_SLUG,
  clientName: "TRACOM",
  projectName: "Votre avis sur notre travail",
  intro:
    "Merci de nous avoir fait confiance pour votre logo et vos modèles de documents. Votre avis nous aide à nous améliorer : cela prend moins d'une minute.",
  sections: [
    {
      title: "Votre note",
      questions: [
        {
          id: "note_globale",
          type: "rating",
          ratingStyle: "stars",
          required: true,
          label: "Dans l'ensemble, comment évaluez-vous le service de Kelenpe ?",
        },
        {
          id: "points_decevants",
          type: "multi_choice",
          showIf: { questionId: "note_globale", max: 3 },
          label: "Qu'est-ce qui vous a déçu ou dérangé ?",
          options: [
            "Les délais",
            "La qualité du résultat (logo, documents)",
            "La communication pendant le projet",
            "Le nombre d'allers-retours pour les corrections",
            "Le prix",
            "Autre",
          ],
          detailOption: "Autre",
          detailPlaceholder: "Précisez…",
        },
        {
          id: "a_ameliorer",
          type: "text",
          showIf: { questionId: "note_globale", max: 3 },
          label: "Que pourrions-nous faire mieux la prochaine fois ?",
        },
        {
          id: "points_apprecies",
          type: "text",
          showIf: { questionId: "note_globale", min: 4 },
          label: "Qu'avez-vous le plus apprécié ?",
          placeholder: "Facultatif",
        },
      ],
    },
    {
      title: "Pour finir",
      questions: [
        {
          id: "recommandation",
          type: "single_choice",
          label: "Recommanderiez-vous Kelenpe à quelqu'un de votre entourage ?",
          options: ["Oui", "Peut-être", "Non"],
        },
        {
          id: "dernier_mot",
          type: "text",
          label: "Un dernier mot ?",
          placeholder: "Facultatif",
        },
      ],
    },
  ],
};
