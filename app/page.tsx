import Link from "next/link";
import { KelenpeLogo } from "@/components/KelenpeLogo";
import { getAllClientSlugs, getClientForm } from "@/lib/clients";

export default function HomePage() {
  const slugs = getAllClientSlugs();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-12">
      <KelenpeLogo priority />
      <h1 className="mt-6 text-2xl font-semibold text-gray-900">
        Formulaires clients
      </h1>
      <p className="mt-2 text-gray-600">
        Sélectionnez un formulaire pour commencer.
      </p>

      <ul className="mt-8 space-y-3">
        {slugs.map((slug) => {
          const form = getClientForm(slug);
          if (!form) return null;

          return (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-kelenpe/40 hover:bg-kelenpe/5"
              >
                <span className="font-medium text-gray-900">
                  {form.clientName}
                </span>
                <span className="mt-0.5 block text-sm text-gray-500">
                  {form.projectName}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
