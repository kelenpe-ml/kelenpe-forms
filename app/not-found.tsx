import { KelenpeLogo } from "@/components/KelenpeLogo";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
      <KelenpeLogo />
      <h1 className="mt-8 text-2xl font-semibold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">Cette page n&apos;existe pas.</p>
    </main>
  );
}
