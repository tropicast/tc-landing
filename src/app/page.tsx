import { Button } from "@/components/base/buttons/button";

/** Placeholder until the content issue (#5): the brand, one sentence and the sign-up link. */
export default function Home() {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center md:px-8">
            <h1 className="max-w-3xl text-display-sm font-semibold text-primary md:text-display-md">Tropicast</h1>
            <p className="max-w-xl text-lg text-tertiary">Your radio on air in minutes, from your computer.</p>
            <Button href="https://app.tropicastradio.com" size="lg">
                Create a free station
            </Button>
        </main>
    );
}
