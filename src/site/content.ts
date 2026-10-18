/**
 * The page's words, in one place: the sections render from this object, and #6 adds the French next to it.
 * Plan limits come from tc-dashboard `Plan.cs` and prices from its `PRICE_LABEL_*` variables (what the app shows);
 * change both together. Every claim here is something that ships today.
 */

export type FeatureIcon = "microphone" | "repeat" | "zap" | "signal" | "globe" | "chart";

export type Plan = {
    id: "free" | "starter" | "growth" | "pro";
    name: string;
    price: string;
    period?: string;
    summary: string;
    highlighted?: boolean;
    features: string[];
};

export const content = {
    nav: { signIn: "Sign in", startFree: "Start free", menu: "Menu", close: "Close menu", sections: "Sections" },
    hero: {
        badge: "Internet radio hosting",
        title: "Your radio on air in minutes",
        lead: "Go live from your computer, let AutoDJ keep playing when nobody is on air, and reach listeners on any phone or browser.",
        primary: "Create a free station",
        secondary: "Download the app",
        note: "Free plan, no card needed.",
        card: { station: "Radio Mada", live: "Live", listeners: "listeners", show: "Morning show", format: "Opus 64 kbps" },
    },
    howItWorks: {
        eyebrow: "How it works",
        title: "Three steps to go live",
        intro: "No server to rent, no software to configure: the app and the dashboard do it for you.",
        steps: [
            { title: "Create your station", text: "Sign up, name your station and pick its plan. It gets its own page and stream links at once." },
            {
                title: "Download Tropicast Station",
                text: "The desktop app for Windows, macOS and Linux. Sign in with your account: it lists your stations, nothing to type.",
            },
            { title: "Go live", text: "Choose your microphone, mixer or computer sound, press Go live. Your listeners hear you within a second." },
        ],
        downloadsTitle: "Download Tropicast Station",
        installGuide: "Installation guide",
        downloads: [
            { platform: "win-x64", label: "Windows" },
            { platform: "osx-arm64", label: "macOS (Apple Silicon)" },
            { platform: "osx-x64", label: "macOS (Intel)" },
            { platform: "linux-x64", label: "Linux (AppImage)" },
        ],
    },
    features: {
        eyebrow: "Features",
        title: "Everything a radio needs",
        intro: "Built for community, church, campus and online radios that need to stay on air without a technician.",
        items: [
            {
                icon: "microphone",
                title: "Live from your computer",
                text: "Broadcast your microphone, a mixer or your computer's sound with the desktop app. BUTT, Mixxx and other Icecast tools work too.",
            },
            {
                icon: "repeat",
                title: "AutoDJ",
                text: "Upload your music and a playlist: AutoDJ plays when nobody is live and hands back to your DJ the moment they connect.",
            },
            {
                icon: "zap",
                title: "Less than a second behind",
                text: "In the web player, listeners hear you less than a second after you speak, and a switch between live and AutoDJ is just as quick.",
            },
            {
                icon: "signal",
                title: "Light on mobile data",
                text: "Every station streams in Opus as well as MP3: about 21 MB per listening hour instead of 58, at the same quality.",
            },
            {
                icon: "globe",
                title: "Your page and player",
                text: "A public page with a player for every station, an embeddable player for your website, and listing in radio directories.",
            },
            {
                icon: "chart",
                title: "Know your audience",
                text: "Listeners live and over time, per station and format, in your dashboard.",
            },
        ] satisfies { icon: FeatureIcon; title: string; text: string }[],
    },
    demo: {
        eyebrow: "Listen",
        title: "Hear a station live",
        intro: "This is the player your listeners get, playing a Tropicast station now.",
        play: "Load the player",
        loadNote: "The player loads only when you ask for it.",
        unavailable: "The demo station is not configured yet. Create your own station to hear it on air.",
    },
    pricing: {
        eyebrow: "Pricing",
        title: "Start free, grow when your audience does",
        intro: "Prices per month, in euros. Change or cancel at any time from your dashboard.",
        popular: "Most popular",
        cta: "Get started",
        ctaFree: "Start free",
        listenersNote: "Listeners: how many people can listen at the same time.",
        plans: [
            {
                id: "free",
                name: "Free",
                price: "€0",
                summary: "Try Tropicast and run a small station.",
                features: ["1 station", "100 listeners", "Up to 64 kbps", "Opus and MP3", "Station page and player", "Listener statistics"],
            },
            {
                id: "starter",
                name: "Starter",
                price: "€19",
                period: "/ month",
                summary: "A station on air around the clock.",
                highlighted: true,
                features: ["1 station", "500 listeners", "Up to 128 kbps", "AutoDJ, 1 GB of music", "Listing in radio directories", "Everything in Free"],
            },
            {
                id: "growth",
                name: "Growth",
                price: "€55",
                period: "/ month",
                summary: "For radios with a growing audience.",
                features: [
                    "3 stations",
                    "5,000 listeners",
                    "Up to 192 kbps",
                    "AutoDJ with scheduling, 5 GB",
                    "Player for your website",
                    "Everything in Starter",
                ],
            },
            {
                id: "pro",
                name: "Pro",
                price: "€120",
                period: "/ month",
                summary: "Networks and large audiences.",
                features: [
                    "5 stations",
                    "25,000 listeners",
                    "Up to 320 kbps",
                    "AutoDJ with scheduling, 20 GB",
                    "Player for your website",
                    "Everything in Growth",
                ],
            },
        ] satisfies Plan[],
    },
    faq: {
        eyebrow: "FAQ",
        title: "Questions",
        items: [
            {
                question: "What do I need to broadcast?",
                answer: "A computer with Windows, macOS or Linux, an internet connection and a microphone or a mixer. About 1 Mbit/s of upload is plenty: the app sends your sound once, our servers deliver it to every listener.",
            },
            {
                question: "How much data do my listeners use?",
                answer: "About 21 MB per hour in Opus, which modern browsers and most apps play, and about 58 MB per hour in MP3 at 128 kbps. Players pick the lighter one when they can.",
            },
            {
                question: "Can I use the software I already have?",
                answer: "Yes. Any Icecast source client, such as BUTT or Mixxx, connects with the credentials shown in your dashboard. The desktop app is the simplest way, not the only one.",
            },
            {
                question: "What happens when my connection drops during a show?",
                answer: "With AutoDJ, your music takes over within seconds and listeners stay connected. The app reconnects by itself, and listeners are back on your show as soon as it does.",
            },
            {
                question: "How do I pay, and can I cancel?",
                answer: "Paid plans are billed monthly by card through Stripe. Upgrade, downgrade or cancel at any time from your dashboard.",
            },
            {
                question: "Where are your servers?",
                answer: "In the European Union, in Germany. Your listeners can be anywhere in the world.",
            },
        ],
    },
    footer: { terms: "Terms", privacy: "Privacy", download: "Download the app", signIn: "Sign in" },
    meta: {
        title: "Tropicast: your radio on air in minutes",
        description:
            "Internet radio hosting: go live from your computer, AutoDJ when nobody is on air, listeners less than a second behind in Opus and MP3. Free plan, no card needed.",
    },
} as const;
