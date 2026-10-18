"use client";

import { ArrowLeft } from "@untitledui/icons";
import { usePathname } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { defaultLocale, getContent, hasLocale } from "@/site/i18n";

/** The 404 page, in the language of the URL (a not-found file gets no params). */
export default function NotFound() {
    const first = usePathname()?.split("/")[1] ?? "";
    const lang = hasLocale(first) ? first : defaultLocale;
    const { notFound } = getContent(lang);

    return (
        <main className="flex min-h-screen items-start bg-primary py-16 md:items-center md:py-24">
            <div className="mx-auto max-w-container grow px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col gap-8 md:gap-12">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-md font-semibold text-brand-secondary">{notFound.code}</span>
                            <h1 className="text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">{notFound.title}</h1>
                        </div>
                        <p className="text-lg text-tertiary md:text-xl">{notFound.text}</p>
                    </div>
                    <div>
                        <Button size="xl" iconLeading={ArrowLeft} href={`/${lang}`}>
                            {notFound.home}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
