import { cx } from "@/utils/cx";

/** The Tropicast mark and name, as in the dashboard's header. The mark is the same artwork in both themes. */
export function Logo({ className }: { className?: string }) {
    return (
        <span className={cx("inline-flex items-center gap-2.5", className)}>
            {/* An SVG with its own gradients: next/image adds nothing for it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tropicast-logo.svg" alt="" width={32} height={32} className="size-8" />
            <span className="text-lg font-semibold text-primary">Tropicast</span>
        </span>
    );
}
