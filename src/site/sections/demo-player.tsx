"use client";

import { useState } from "react";
import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

/**
 * The demo station's embedded player (tc-dashboard `/embed/...`). It loads only when the visitor asks: the page stays
 * light, and nothing is fetched from the app before that.
 */
export function DemoPlayer({ embedUrl, title, play, loadNote }: { embedUrl: string; title: string; play: string; loadNote: string }) {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return <iframe src={embedUrl} title={title} allow="autoplay" className="h-30 w-full max-w-xl rounded-xl border-0" />;
    }
    return (
        <div className="flex flex-col items-start gap-3">
            <Button size="xl" iconLeading={PlayCircle} onClick={() => setLoaded(true)}>
                {play}
            </Button>
            <p className="text-sm text-tertiary">{loadNote}</p>
        </div>
    );
}
