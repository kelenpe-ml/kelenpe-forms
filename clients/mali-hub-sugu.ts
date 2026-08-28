import type { ClientForm } from "@/lib/types";

export const maliHubSugu: ClientForm = {
  slug: "mali-hub-sugu",
  clientName: "Mali Hub Sugu",
  projectName: "Site web & application",
  intro:
    "Avant de vous proposer un prix et un délai que nous pourrons réellement tenir, nous avons besoin de mieux comprendre certains points. Répondez simplement, avec vos mots.",
  sections: [
    {
      title: "Votre projet",
      questions: [
        {
          id: "app-type",
          type: "single_choice",
          label:
            "Souhaitez-vous une application à télécharger sur le téléphone, ou plutôt un site web utilisable directement dans le navigateur ?",
          options: [
            "Une application à télécharger (App Store / Play Store)",
            "Un site web adapté au téléphone, sans téléchargement",
            "Je ne sais pas, j'aimerais votre avis",
          ],
          alert:
            "Une application à télécharger coûte généralement plus cher et prend plus de temps à réaliser qu'un site web mobile. Les deux peuvent fonctionner sur téléphone, mais ce n'est pas la même chose.",
        },
        {
          id: "payment-mode",
          type: "single_choice",
          label: "Comment vos clients paieront-ils leurs achats ?",
          options: [
            "Mobile Money (Orange Money, Moov Money, etc.)",
            "Carte bancaire en ligne",
            "Paiement à la livraison (espèces)",
            "Plusieurs modes de paiement en même temps",
            "Je ne sais pas encore",
          ],
          alert:
            "Chaque mode de paiement demande une configuration différente. Proposer plusieurs modes en même temps rend le projet plus complexe et plus long à mettre en place.",
        },
        {
          id: "deadline",
          type: "single_choice",
          label:
            "Avez-vous une date limite impérative, par exemple « tout doit être prêt dans 30 jours » ?",
          options: [
            "Oui, nous avons une date limite fixe",
            "Non, nous sommes flexibles sur le délai",
            "Nous avons une idée mais elle peut bouger",
          ],
          alert:
            "Un délai très court limite ce qu'il est possible de faire dans la qualité attendue. Mieux vaut être honnête dès le départ pour éviter les mauvaises surprises.",
          placeholder:
            "Précisez votre délai ou vos contraintes (ex. : lancement prévu le 15 mars, ou « pas avant 2 mois »)",
        },
        {
          id: "budget",
          type: "text",
          label:
            "Avez-vous une enveloppe budgétaire approximative pour ce projet ? (Montant ou fourchette, même approximative)",
          placeholder: "Ex. : entre 500 000 et 1 000 000 FCFA, ou « nous verrons selon votre devis »",
          alert:
            "Connaître votre budget nous permet de vous proposer une solution réaliste, sans vous sur-vendre ni vous proposer quelque chose d'inaccessible.",
        },
      ],
    },
    {
      title: "Fonctionnement de la plateforme",
      questions: [
        {
          id: "seller-access",
          type: "single_choice",
          label:
            "Qui pourra vendre sur votre plateforme ? Faut-il valider chaque vendeur avant qu'il puisse publier ?",
          options: [
            "Tout le monde peut s'inscrire et vendre directement",
            "Les vendeurs s'inscrivent, mais nous validons avant publication",
            "Seuls des vendeurs que nous invitons peuvent vendre",
            "Je ne sais pas encore",
          ],
          alert:
            "La validation manuelle des vendeurs demande un espace d'administration et du temps de votre côté à chaque nouvelle inscription.",
        },
        {
          id: "tender-module",
          type: "single_choice",
          label:
            "Le module « appels d'offres » (les clients publient un besoin, les prestataires répondent) est-il indispensable dès le lancement ?",
          options: [
            "Oui, indispensable dès le premier jour",
            "Non, on peut l'ajouter plus tard",
            "Je ne suis pas sûr de ce que c'est exactement",
          ],
          alert:
            "Ce module est l'un des plus complexes à développer. Le reporter à une phase ultérieure permet de lancer plus vite le reste de la plateforme.",
        },
        {
          id: "delivery-org",
          type: "text",
          label:
            "Comment fonctionne aujourd'hui la livraison de vos produits ? (Qui livre, où, comment le client est informé…)",
          placeholder:
            "Décrivez votre organisation actuelle, même si elle est simple ou en cours de réflexion",
        },
      ],
    },
    {
      title: "Contenu et lancement",
      questions: [
        {
          id: "content-availability",
          type: "single_choice",
          label:
            "Avez-vous déjà les contenus nécessaires : textes, photos, logo ?",
          options: [
            "Oui, tout est prêt",
            "En partie (logo oui, photos non, par exemple)",
            "Non, il faudra les créer ou les récupérer",
            "Je ne sais pas exactement ce qu'il faut",
          ],
          alert:
            "Sans contenus prêts, le projet peut avancer techniquement mais le site ne pourra pas être mis en ligne tant que textes, images et logo ne sont pas fournis.",
        },
        {
          id: "top-features",
          type: "feature_priority",
          label:
            "Quelles sont les 3 fonctionnalités les plus importantes pour vous au lancement ? (Choisissez maximum 3)",
          options: [
            "Page vitrine (présentation de l'entreprise)",
            "Vente de produits en ligne",
            "Espace vendeur (gestion des produits, commandes)",
            "Espace acheteur (suivi des commandes, profil)",
            "Annuaire de prestataires",
            "Appels d'offres",
            "Actualités / blog",
          ],
        },
        {
          id: "language",
          type: "single_choice",
          label: "Dans quelle(s) langue(s) le site doit-il être disponible ?",
          options: ["Français uniquement", "Français et anglais", "Autres langues"],
          alert:
            "Chaque langue supplémentaire implique de traduire tous les textes du site et augmente le temps de préparation.",
          placeholder: "Précisez les langues souhaitées (ex. : bambara, anglais…)",
        },
      ],
    },
  ],
};
