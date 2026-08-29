import type { ClientForm } from "@/lib/types";

export const MALI_HUB_SUGU_PRECISIONS_SLUG = "mali-hub-sugu-w8n4k2p6v3";

export const maliHubSuguPrecisions: ClientForm = {
  slug: MALI_HUB_SUGU_PRECISIONS_SLUG,
  clientName: "Mali Hub Sugu",
  projectName: "Dernières précisions avant de démarrer",
  intro:
    "Merci pour vos premières réponses. Il ne reste que quelques points à préciser pour vous proposer un prix définitif et démarrer sans interruption.",
  sections: [
    {
      title: "Priorité au lancement",
      questions: [
        {
          id: "appels_offres_clarification",
          type: "text",
          label:
            "Une précision sur vos réponses précédentes : vous nous avez dit que le module « appels d'offres » pouvait arriver plus tard, mais vous l'avez aussi classé dans vos 3 fonctionnalités les plus importantes au lancement. Lequel des deux correspond le mieux à ce que vous voulez vraiment ?",
        },
      ],
    },
    {
      title: "Le paiement",
      questions: [
        {
          id: "payment_flow",
          type: "single_choice",
          label:
            "Quand un acheteur paie, préférez-vous que l'argent aille directement au vendeur, ou qu'il passe d'abord par un compte Mali Hub Sugu (pour prélever une commission avant de reverser) ?",
          options: [
            "Directement au vendeur, sans passer par un compte Mali Hub Sugu",
            "Par un compte Mali Hub Sugu, avec reversement ensuite",
            "Je ne sais pas, conseillez-nous",
          ],
          alert:
            "Faire transiter l'argent par un compte central est bien plus complexe techniquement, et doit encore être vérifié auprès d'Orange Mali / Moov Mali.",
        },
        {
          id: "commission_model",
          type: "single_choice",
          label: "Si vous prélevez une commission, comment l'imaginez-vous ?",
          options: [
            "Un pourcentage sur chaque vente",
            "Un abonnement fixe payé par chaque vendeur",
            "Pas de commission pour l'instant",
          ],
        },
        {
          id: "merchant_accounts",
          type: "single_choice",
          label:
            "Avez-vous déjà des identifiants API (compte marchand) chez Orange Money et/ou Moov Money ?",
          options: ["Oui, déjà en place", "Non, à obtenir", "Je ne sais pas"],
          alert:
            "C'est à vous de vous procurer ces identifiants auprès des opérateurs ; nous les utiliserons une fois obtenus.",
        },
      ],
    },
    {
      title: "L'application mobile",
      questions: [
        {
          id: "store_account_owner",
          type: "single_choice",
          label:
            "Pour publier sur l'App Store et le Google Play Store, souhaitez-vous que les comptes développeur soient à votre nom (vous restez propriétaire de l'application), ou au nom de Kelenpe ?",
          options: [
            "À notre nom, Mali Hub Sugu",
            "Au nom de Kelenpe pour l'instant",
            "Je ne sais pas, conseillez-nous",
          ],
          alert:
            "Nous recommandons votre nom : vous restez propriétaire de l'application sur le long terme.",
        },
        {
          id: "app_name",
          type: "text",
          label: "Quel nom souhaitez-vous voir affiché sur les stores ?",
        },
      ],
    },
    {
      title: "La validation des vendeurs",
      questions: [
        {
          id: "vendor_requirements",
          type: "single_choice",
          label: "Qu'est-ce qu'un vendeur doit vous fournir pour être validé ?",
          options: [
            "Rien de particulier, une vérification visuelle suffit",
            "Une pièce d'identité",
            "Un document d'activité commerciale (registre, autorisation)",
          ],
        },
        {
          id: "vendor_requirements_other",
          type: "text",
          label: "Autre chose à préciser sur la validation des vendeurs ? (facultatif)",
          placeholder: "Laissez vide si les options ci-dessus suffisent",
        },
      ],
    },
  ],
};
