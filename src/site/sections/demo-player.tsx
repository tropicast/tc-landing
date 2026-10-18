"use client";

import { useState } from "react";
import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { content } from "@/site/content";

const { demo } = content;

/**
 * The demo station's embedded player (tc-dashboard `/embed/...`). It loads only when the visitor asks: the page stays
 * light, and nothing is fetched from the app before that.
 */
export function DemoPlayer({ embedUrl }: { embedUrl: string }) {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return <iframe src={embedUrl} title={demo.title} allow="autoplay" className="h-30 w-full max-w-xl rounded-xl border-0" />;
    }
    return (
        <div className="flex flex-col items-start gap-3">
            <Button size="xl" iconLeading={PlayCircle} onClick={() => setLoaded(true)}>
                {demo.play}
            </Button>
            <p className="text-sm text-tertiary">{demo.loadNote}</p>
        </div>
    );
}
