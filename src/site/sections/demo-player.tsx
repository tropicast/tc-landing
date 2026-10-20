"use client";

import { useState } from "react";
import { PlayCircle } from "@untitledui/icons";
import { buttonClass, buttonTextClass } from "@/site/ui/styles";

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
            <button type="button" className={buttonClass("primary", "xl")} onClick={() => setLoaded(true)}>
                <PlayCircle data-icon aria-hidden="true" />
                <span data-text className={buttonTextClass}>
                    {play}
                </span>
            </button>
            <p className="text-sm text-tertiary">{loadNote}</p>
        </div>
    );
}
