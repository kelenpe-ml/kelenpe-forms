import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { ClientForm, FormAnswers } from "@/lib/types";
import { formatAnswerValue } from "@/lib/formatAnswer";

const KELENPE_BRAND = "#1A1A1A";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.5,
  },
  header: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: KELENPE_BRAND,
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: KELENPE_BRAND,
    marginTop: 16,
    marginBottom: 10,
  },
  questionBlock: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  questionLabel: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  answer: {
    color: "#333333",
  },
});

type ResponsesPdfProps = {
  form: ClientForm;
  answers: FormAnswers;
  submittedAt: Date;
};

function ResponsesDocument({ form, answers, submittedAt }: ResponsesPdfProps) {
  const formattedDate = submittedAt.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>KELENPE</Text>
        <Text style={styles.title}>
          Réponses — {form.projectName} — {form.clientName}
        </Text>
        <Text style={styles.date}>Reçu le {formattedDate}</Text>

        {form.sections.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.questions.map((question) => (
              <View key={question.id} style={styles.questionBlock} wrap={false}>
                <Text style={styles.questionLabel}>{question.label}</Text>
                <Text style={styles.answer}>
                  {formatAnswerValue(answers[question.id])}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}

export async function generateResponsesPdf(
  form: ClientForm,
  answers: FormAnswers,
): Promise<Buffer> {
  const submittedAt = new Date();
  const buffer = await renderToBuffer(
    <ResponsesDocument
      form={form}
      answers={answers}
      submittedAt={submittedAt}
    />,
  );

  return Buffer.from(buffer);
}
