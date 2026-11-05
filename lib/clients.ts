import {
  maliHubSugu,
  MALI_HUB_SUGU_SLUG,
} from "@/clients/mali-hub-sugu-x7k2m9qp1a";
import {
  maliHubSuguPrecisions,
  MALI_HUB_SUGU_PRECISIONS_SLUG,
} from "@/clients/mali-hub-sugu-w8n4k2p6v3";
import {
  ficheEntretienCommercant,
  FICHE_ENTRETIEN_SLUG,
} from "@/clients/fiche-entretien-commercant-1ad205c40a";
import {
  tracomAvis,
  TRACOM_AVIS_SLUG,
} from "@/clients/tracom-avis-98e34967d4";
import {
  formationDevIa,
  FORMATION_DEV_IA_SLUG,
} from "@/clients/formation-dev-ia-5c81e7a2b9";
import type { ClientForm } from "@/lib/types";

const clients: Record<string, ClientForm> = {
  [MALI_HUB_SUGU_SLUG]: maliHubSugu,
  [MALI_HUB_SUGU_PRECISIONS_SLUG]: maliHubSuguPrecisions,
  [FICHE_ENTRETIEN_SLUG]: ficheEntretienCommercant,
  [TRACOM_AVIS_SLUG]: tracomAvis,
  [FORMATION_DEV_IA_SLUG]: formationDevIa,
};

export function getClientForm(slug: string): ClientForm | undefined {
  return clients[slug];
}

export function getAllClientSlugs(): string[] {
  return Object.keys(clients);
}
