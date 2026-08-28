import { maliHubSugu } from "@/clients/mali-hub-sugu";
import type { ClientForm } from "@/lib/types";

const clients: Record<string, ClientForm> = {
  "mali-hub-sugu": maliHubSugu,
};

export function getClientForm(slug: string): ClientForm | undefined {
  return clients[slug];
}

export function getAllClientSlugs(): string[] {
  return Object.keys(clients);
}
