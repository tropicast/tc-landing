import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defaultLocale, getContent, hasLocale } from "@/site/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Tropicast";

/** Shared preview image (Open Graph, X), one per language: the logo on the brand's dark teal, the name and the promise. */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const { hero } = getContent(hasLocale(lang) ? lang : defaultLocale);
    const logo = await readFile(join(process.cwd(), "public/tropicast-logo.svg"));
    const src = `data:image/svg+xml;base64,${logo.toString("base64")}`;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 64,
                padding: "0 96px",
                background: "linear-gradient(135deg, #134e4a 0%, #0f2e2c 100%)",
                color: "#ffffff",
            }}
        >
            <img src={src} width={280} height={280} alt="" />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>Tropicast</div>
                <div style={{ fontSize: 40, color: "#99f6e4", maxWidth: 640 }}>{hero.title}</div>
            </div>
        </div>,
        size,
    );
}
