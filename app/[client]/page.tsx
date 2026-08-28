import { notFound } from "next/navigation";
import { ClientFormPage } from "@/components/ClientFormPage";
import { getAllClientSlugs, getClientForm } from "@/lib/clients";

type PageProps = {
  params: Promise<{ client: string }>;
};

export function generateStaticParams() {
  return getAllClientSlugs().map((client) => ({ client }));
}

export async function generateMetadata({ params }: PageProps) {
  const { client: slug } = await params;
  const form = getClientForm(slug);

  if (!form) {
    return { title: "Formulaire introuvable" };
  }

  return {
    title: `${form.projectName} — ${form.clientName} | Kelenpe`,
    description: form.intro,
  };
}

export default async function ClientPage({ params }: PageProps) {
  const { client: slug } = await params;
  const form = getClientForm(slug);

  if (!form) {
    notFound();
  }

  return <ClientFormPage form={form} />;
}
