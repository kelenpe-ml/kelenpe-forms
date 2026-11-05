import type { ClientForm } from "@/lib/types";

export const FORMATION_DEV_IA_SLUG = "formation-dev-ia-5c81e7a2b9";

const AUTRE = "Autre";
const PRECISEZ = "Précisez…";

export const formationDevIa: ClientForm = {
  slug: FORMATION_DEV_IA_SLUG,
  clientName: "Kelenpe",
  projectName: "Questionnaire avant la formation",
  intro:
    "Merci pour votre confiance. Avant de construire le programme, quelques questions pour l'adapter à votre niveau et à vos attentes.",
  sections: [
    {
      title: "Vos objectifs",
      questions: [
        {
          id: "attentes",
          code: "1",
          required: true,
          type: "multi_choice",
          label: "Qu'attendez-vous de la formation ? (plusieurs choix possibles)",
          options: [
            "Comprendre comment fonctionne une application web ou mobile",
            "Être capable de développer seul une première version d'application",
            "Savoir mettre une application en ligne et la maintenir",
            "Pouvoir échanger avec des développeurs et suivre leur travail",
            AUTRE,
          ],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
        {
          id: "projet_personnel",
          code: "2",
          required: true,
          type: "single_choice",
          label:
            "Avez-vous un projet personnel sur lequel vous aimeriez qu'on s'appuie pour les exercices ?",
          options: ["Oui", "Non, je préfère des exercices proposés par la formatrice"],
        },
        {
          id: "projet_personnel_detail",
          type: "short_text",
          required: true,
          showIf: { questionId: "projet_personnel", equals: "Oui" },
          label: "Si oui, décrivez-le en une phrase",
        },
      ],
    },
    {
      title: "Votre parcours",
      questions: [
        {
          id: "domaine_c",
          code: "3",
          required: true,
          type: "multi_choice",
          label: "Dans quel domaine utilisez-vous le C ? (plusieurs choix possibles)",
          options: [
            "Embarqué / électronique",
            "Systèmes / Linux",
            "Réseau / télécoms",
            "Industriel",
            AUTRE,
          ],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
        {
          id: "realisation_c",
          code: "4",
          required: true,
          type: "text",
          label:
            "Qu'avez-vous déjà réalisé en C ? Un projet que vous pourriez me décrire ou me montrer.",
        },
        {
          id: "outils",
          code: "5",
          required: true,
          type: "multi_choice",
          label: "Quels outils avez-vous déjà utilisés ? (plusieurs choix possibles)",
          options: [
            "Un autre langage (Python, Java, JavaScript, PHP…)",
            "Git / GitHub",
            "Bases de données (SQL)",
            "HTML / CSS",
            "Aucun de ces outils",
            AUTRE,
          ],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
        {
          id: "outils_ia",
          code: "6",
          required: true,
          type: "single_choice",
          label: "Utilisez-vous déjà des outils d'IA (ChatGPT, Claude, Copilot…) ?",
          options: ["Oui, pour coder", "Oui, mais pas pour coder", "Non, jamais"],
        },
        {
          id: "documentation",
          code: "7",
          required: true,
          type: "single_choice",
          label: "Êtes-vous à l'aise pour lire de la documentation ?",
          options: ["Oui", "Un peu", "Non"],
        },
      ],
    },
    {
      title: "La méthode",
      questions: [
        {
          id: "approche",
          code: "8",
          required: true,
          type: "single_choice",
          label:
            "Je vous propose une approche moderne : plutôt que d'apprendre chaque langage ligne par ligne, on s'appuie sur des outils d'IA qui génèrent le code (le « vibecoding »). Vous apprenez les concepts : architecture d'une application, front-end et back-end, bases de données, API, sécurité, déploiement. Votre expérience en C reste un vrai atout pour relire, comprendre et contrôler ce que l'IA produit. Quelle approche préférez-vous ?",
          options: [
            "L'approche avec l'IA (vibecoding)",
            "Une formation classique centrée sur le code",
            "Un mélange des deux",
            AUTRE,
          ],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
      ],
    },
    {
      title: "Organisation",
      questions: [
        {
          id: "systeme",
          code: "9",
          required: true,
          type: "single_choice",
          label: "Quel système d'exploitation utilisez-vous ?",
          options: ["Windows", "macOS", "Linux", AUTRE],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
        {
          id: "machine",
          code: "10",
          required: true,
          type: "single_choice",
          label: "Quelle machine utilisez-vous ?",
          options: ["Ordinateur portable", "Ordinateur fixe"],
        },
        {
          id: "ram",
          type: "short_text",
          label: "Mémoire (RAM), si vous la connaissez",
          placeholder: "Facultatif (ex. 8 Go)",
        },
        {
          id: "rencontres",
          code: "11",
          required: true,
          type: "single_choice",
          label:
            "La formation se fera en ligne. Nous pourrons aussi nous rencontrer lorsque nous serons dans la même ville, et vous pourrez vous déplacer si vous le souhaitez. Cela vous convient-il ?",
          options: ["Oui", "Non, je préfère"],
          detailOption: "Non, je préfère",
          detailPlaceholder: "Précisez votre préférence…",
        },
        {
          id: "jours",
          code: "12",
          required: true,
          type: "multi_choice",
          label: "Quels jours vous conviennent ? (plusieurs choix possibles)",
          options: ["En semaine", "Le week-end"],
        },
        {
          id: "moment",
          code: "13",
          required: true,
          type: "multi_choice",
          label: "À quel moment de la journée ? (plusieurs choix possibles)",
          options: ["En journée", "En soirée"],
        },
        {
          id: "heures_par_semaine",
          code: "14",
          required: true,
          type: "single_choice",
          label:
            "Combien d'heures par semaine pouvez-vous y consacrer, travail personnel compris ?",
          options: ["Moins de 3 h", "3 à 6 h", "Plus de 6 h"],
        },
        {
          id: "duree",
          code: "15",
          required: true,
          type: "single_choice",
          label: "Sur quelle durée envisagez-vous la formation ?",
          options: ["1 mois", "2 à 3 mois", "Plus de 3 mois", AUTRE],
          detailOption: AUTRE,
          detailPlaceholder: PRECISEZ,
        },
        {
          id: "date_debut",
          code: "16",
          required: true,
          type: "date",
          label: "À partir de quelle date souhaitez-vous commencer ?",
        },
      ],
    },
  ],
};
