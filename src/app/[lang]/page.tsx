import { notFound } from "next/navigation";
import { getContent, hasLocale } from "@/site/i18n";
import { LandingPage } from "@/site/landing-page";

export default async function Home({ params }: PageProps<"/[lang]">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    return <LandingPage t={getContent(lang)} />;
}
