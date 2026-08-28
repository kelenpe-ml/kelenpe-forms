import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientForm } from "@/lib/clients";
import { generateResponsesPdf } from "@/lib/pdf/ResponsesPdf";
import type { FormAnswers } from "@/lib/types";

type SubmitBody = {
  slug?: string;
  answers?: FormAnswers;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;

    if (!body.slug || typeof body.slug !== "string") {
      return NextResponse.json(
        { error: "Le slug du client est requis." },
        { status: 400 },
      );
    }

    if (!body.answers || typeof body.answers !== "object") {
      return NextResponse.json(
        { error: "Les réponses du formulaire sont requises." },
        { status: 400 },
      );
    }

    const form = getClientForm(body.slug);
    if (!form) {
      return NextResponse.json(
        { error: "Formulaire client introuvable." },
        { status: 404 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const inboxEmail = process.env.KELENPE_INBOX_EMAIL;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration email incomplète (clé API)." },
        { status: 500 },
      );
    }

    if (!inboxEmail) {
      console.error("KELENPE_INBOX_EMAIL manquante");
      return NextResponse.json(
        { error: "Configuration email incomplète (destinataire)." },
        { status: 500 },
      );
    }

    const pdfBuffer = await generateResponsesPdf(form, body.answers);
    const dateSlug = new Date().toISOString().slice(0, 10);

    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: "Kelenpe Forms <formulaires@resend.kelenpe.com>",
      to: inboxEmail,
      subject: `Nouvelles réponses — ${form.clientName}`,
      text: `Nouvelles réponses reçues pour ${form.clientName} (${form.projectName}). Consultez la pièce jointe PDF.`,
      attachments: [
        {
          filename: `reponses-${body.slug}-${dateSlug}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        {
          error:
            "L'envoi de l'email a échoué. Veuillez réessayer dans quelques instants.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Erreur /api/submit:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur inattendue s'est produite. Veuillez réessayer.",
      },
      { status: 500 },
    );
  }
}
