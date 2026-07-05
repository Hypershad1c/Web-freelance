import { notFound } from "next/navigation";
import FrenchHome from "./FrenchHome";
import ArabicHome from "./ArabicHome";

const LOCALES = ["fr", "ar"];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocalePage({ params }) {
  if (!LOCALES.includes(params.locale)) {
    notFound();
  }
  return params.locale === "ar" ? <ArabicHome /> : <FrenchHome />;
}
