import type { ClientForm } from "@/lib/types";

export const FICHE_ENTRETIEN_SLUG = "fiche-entretien-commercant-1ad205c40a";

export const ficheEntretienCommercant: ClientForm = {
  slug: FICHE_ENTRETIEN_SLUG,
  clientName: "Boutik",
  projectName: "Fiche d'entretien commerçant",
  intro:
    "Fiche à remplir pendant l'entretien. Tous les champs sont facultatifs : passez ceux qui ne s'appliquent pas. Les rubriques les plus importantes sont en premier.",
  sections: [
    {
      title: "B. Qui fait quoi",
      questions: [
        {
          id: "b1_encaisse",
          code: "B1",
          type: "multi_choice",
          label: "Qui encaisse au quotidien ?",
          options: [
            "Le patron",
            "Le magasinier",
            "Un employé",
            "Plusieurs personnes",
          ],
        },
        {
          id: "b2_voit_activite",
          code: "B2",
          type: "multi_choice",
          label: "Qui a besoin de voir l'activité sans être sur place ?",
          options: ["Le patron", "Un associé", "Le comptable", "Personne"],
        },
        {
          id: "b3_deplacements",
          code: "B3",
          type: "single_choice",
          label: "À quelle fréquence le patron est-il en déplacement ?",
          options: [
            "Tous les jours",
            "Plusieurs fois par semaine",
            "Quelques fois par mois",
          ],
        },
      ],
    },
    {
      title: "C. Appareils et connexion",
      questions: [
        {
          id: "c1_appareils",
          code: "C1",
          type: "multi_choice",
          label: "Appareils utilisés aujourd'hui",
          options: ["Ordinateur", "Tablette", "Téléphone"],
        },
        {
          id: "c2_modele_telephone",
          code: "C2",
          type: "short_text",
          label: "Modèle exact du téléphone du magasinier",
          placeholder: "Ex. : marque et modèle",
        },
        {
          id: "c3_photo_a_propos",
          code: "C3",
          type: "file",
          label: "Photo de l'écran « À propos du téléphone »",
        },
        {
          id: "c4_internet_boutique",
          code: "C4",
          type: "single_choice",
          label: "Internet en boutique",
          options: ["Toujours", "Parfois", "Rarement"],
        },
        {
          id: "c5_internet_deplacement",
          code: "C5",
          type: "single_choice",
          label: "Internet en déplacement",
          options: ["Toujours", "Parfois", "Rarement"],
        },
      ],
    },
    {
      title: "D. Le logiciel actuel",
      questions: [
        {
          id: "d1_logiciel",
          code: "D1",
          type: "short_text",
          label: "Nom du logiciel et depuis quand",
        },
        {
          id: "d2_plait",
          code: "D2",
          type: "text",
          label: "Ce qui leur plaît",
        },
        {
          id: "d3_manque",
          code: "D3",
          type: "text",
          label: "Ce qui les agace ou leur manque",
        },
        {
          id: "d4_remplacer",
          code: "D4",
          type: "single_choice",
          label: "Remplacer ou garder à côté ?",
          options: [
            "Le remplacer",
            "Le garder à côté",
            "Je ne sais pas encore",
          ],
        },
        {
          id: "d5_export_possible",
          code: "D5",
          type: "single_choice",
          label: "Peuvent-ils fournir un export de leurs articles et stocks ?",
          options: ["Oui", "Non", "À voir"],
        },
        {
          id: "d6_export_fichier",
          code: "D6",
          type: "file",
          label: "Fichier ou photo de l'export",
        },
      ],
    },
    {
      title: "E. Les « PDF »",
      questions: [
        {
          id: "e1_usage_pdf",
          code: "E1",
          type: "multi_choice",
          label: "À quoi serviraient-ils ?",
          options: [
            "Tickets",
            "Factures",
            "Rapport de stock",
            "Inventaire",
            "Relevé d'ardoise d'un client",
            "Autre",
          ],
          detailOption: "Autre",
          detailPlaceholder: "Précisez",
        },
        {
          id: "e2_envoi_pdf",
          code: "E2",
          type: "multi_choice",
          label: "Envoi par quel moyen ?",
          options: ["WhatsApp", "Impression", "Mail", "Autre"],
          detailOption: "Autre",
          detailPlaceholder: "Précisez",
        },
      ],
    },
    {
      title: "F. L'activité",
      questions: [
        {
          id: "f1_nb_articles",
          code: "F1",
          type: "number",
          label: "Nombre d'articles (environ)",
        },
        {
          id: "f2_ventes_jour",
          code: "F2",
          type: "number",
          label: "Nombre de ventes par jour (environ)",
        },
        {
          id: "f3_paiements",
          code: "F3",
          type: "multi_choice",
          label: "Moyens de paiement",
          options: ["Espèces", "Mobile money", "Ardoise", "Autre"],
          detailOption: "Autre",
          detailPlaceholder: "Précisez",
        },
        {
          id: "f4_importance_ardoises",
          code: "F4",
          type: "rating",
          label: "Importance des ardoises (1 = faible, 5 = très forte)",
        },
      ],
    },
    {
      title: "G. Les prix",
      questions: [
        {
          id: "g1_prix_actuel",
          code: "G1",
          type: "short_text",
          label:
            "Combien paient-ils aujourd'hui pour leur logiciel, s'il est payant ?",
          hostNote:
            "Ne suggérer aucun chiffre, laisser le commerçant répondre le premier.",
        },
        {
          id: "g2_budget",
          code: "G2",
          type: "short_text",
          label: "Quel budget accepteraient-ils pour quelque chose de mieux ?",
          hostNote:
            "Ne suggérer aucun chiffre, laisser le commerçant répondre le premier.",
        },
      ],
    },
    {
      title: "A. Le commerçant (facultatif)",
      questions: [
        {
          id: "a1_nom_activite",
          code: "A1",
          type: "short_text",
          label: "Nom et activité",
        },
        {
          id: "a2_ville",
          code: "A2",
          type: "short_text",
          label: "Ville",
        },
        {
          id: "a3_contact",
          code: "A3",
          type: "short_text",
          label: "Contact (téléphone ou WhatsApp, facultatif)",
        },
      ],
    },
    {
      title: "H. Suite",
      questions: [
        {
          id: "h1_essai",
          code: "H1",
          type: "single_choice",
          label: "Accepteraient-ils d'essayer une version avant de décider ?",
          options: ["Oui", "Non", "Peut-être"],
        },
        {
          id: "h2_notes",
          code: "H2",
          type: "text",
          label: "Notes libres",
        },
      ],
    },
  ],
};
