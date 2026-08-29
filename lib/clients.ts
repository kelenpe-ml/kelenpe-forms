import {
  maliHubSugu,
  MALI_HUB_SUGU_SLUG,
} from "@/clients/mali-hub-sugu-x7k2m9qp1a";
import {
  maliHubSuguPrecisions,
  MALI_HUB_SUGU_PRECISIONS_SLUG,
} from "@/clients/mali-hub-sugu-w8n4k2p6v3";
import type { ClientForm } from "@/lib/types";

const clients: Record<string, ClientForm> = {
  [MALI_HUB_SUGU_SLUG]: maliHubSugu,
  [MALI_HUB_SUGU_PRECISIONS_SLUG]: maliHubSuguPrecisions,
};

export function getClientForm(slug: string): ClientForm | undefined {
  return clients[slug];
}

export function getAllClientSlugs(): string[] {
  return Object.keys(clients);
}
