import type { Content } from "./en";

/**
 * Les textes de la page en français : même structure que `en.ts`. Typographie française : espace fine insécable
 * avant : ; ! ? et insécable dans « », les montants (19 €) et les unités (64 kbit/s).
 */
export const fr: Content = {
    lang: "fr",
    languageName: "Français",
    nav: { signIn: "Se connecter", startFree: "Commencer gratuitement", menu: "Menu", close: "Fermer le menu", sections: "Sections", language: "Langue" },
    theme: { light: "Thème clair", dark: "Thème sombre" },
    numberLocale: "fr-FR",
    beta: {
        badge: "Bêta",
        label: "Version bêta",
        text: "Tropicast est en version bêta : le service fonctionne, mais certaines fonctionnalités et certains prix peuvent encore changer.",
    },
    hero: {
        badge: "Hébergement de radio en ligne",
        title: "Votre radio à l’antenne en quelques minutes",
        lead: "Passez en direct depuis votre ordinateur, laissez l’AutoDJ prendre le relais quand personne n’est à l’antenne, et touchez vos auditeurs sur n’importe quel téléphone ou navigateur.",
        primary: "Créer une station gratuite",
        secondary: "Télécharger l’application",
        note: "Offre gratuite, sans carte bancaire.",
        card: { station: "Radio Tropicast", live: "En direct", listeners: "auditeurs", show: "La matinale", format: "Opus 64 kbit/s" },
    },
    howItWorks: {
        eyebrow: "Comment ça marche",
        title: "Trois étapes pour passer en direct",
        intro: "Pas de serveur à louer, pas de logiciel à configurer : l’application et le tableau de bord s’en chargent.",
        steps: [
            {
                title: "Créez votre station",
                text: "Inscrivez-vous, nommez votre station et choisissez son offre. Elle a aussitôt sa page et ses liens d’écoute.",
            },
            {
                title: "Téléchargez Tropicast Station",
                text: "L’application pour Windows, macOS et Linux. Connectez-vous avec votre compte : elle affiche vos stations, rien à saisir.",
            },
            {
                title: "Passez en direct",
                text: "Choisissez votre micro, votre table de mixage ou le son de l’ordinateur, appuyez sur Go Live. Vos auditeurs vous entendent en moins d’une seconde.",
            },
        ],
        downloadsTitle: "Télécharger Tropicast Station",
        installGuide: "Guide d’installation",
        downloads: [
            { platform: "win-x64", label: "Windows" },
            { platform: "osx-arm64", label: "macOS (Apple Silicon)" },
            { platform: "osx-x64", label: "macOS (Intel)" },
            { platform: "linux-x64", label: "Linux (AppImage)" },
        ],
    },
    features: {
        eyebrow: "Fonctionnalités",
        title: "Tout ce dont une radio a besoin",
        intro: "Pensé pour les radios associatives, confessionnelles, étudiantes et web qui doivent rester à l’antenne sans technicien.",
        items: [
            {
                icon: "microphone",
                title: "En direct depuis votre ordinateur",
                text: "Diffusez votre micro, une table de mixage ou le son de votre ordinateur avec l’application. BUTT, Mixxx et les autres outils Icecast fonctionnent aussi.",
            },
            {
                icon: "repeat",
                title: "AutoDJ",
                text: "Importez votre musique et une playlist : l’AutoDJ joue quand personne n’est en direct et rend l’antenne à votre animateur dès sa connexion.",
            },
            {
                icon: "zap",
                title: "Moins d’une seconde de décalage",
                text: "Dans le lecteur web, vos auditeurs vous entendent moins d’une seconde après que vous parlez, et le passage du direct à l’AutoDJ est tout aussi rapide.",
            },
            {
                icon: "signal",
                title: "Économe en données mobiles",
                text: "Chaque station diffuse en Opus en plus du MP3 : environ 21 Mo par heure d’écoute au lieu de 58, pour la même qualité.",
            },
            {
                icon: "globe",
                title: "Votre page et votre lecteur",
                text: "Une page publique avec un lecteur pour chaque station, un lecteur à intégrer à votre site, et le référencement dans les annuaires de radios.",
            },
            {
                icon: "chart",
                title: "Connaissez votre audience",
                text: "Vos auditeurs en direct et dans le temps, par station et par format, dans votre tableau de bord.",
            },
        ],
    },
    demo: {
        eyebrow: "Écouter",
        title: "Écoutez une station en direct",
        intro: "Voici le lecteur de vos auditeurs, sur une station Tropicast en ce moment.",
        play: "Charger le lecteur",
        loadNote: "Le lecteur ne se charge que si vous le demandez.",
        unavailable: "La station de démonstration n’est pas encore configurée. Créez la vôtre pour l’entendre à l’antenne.",
    },
    pricing: {
        eyebrow: "Tarifs",
        title: "Commencez gratuitement, grandissez avec votre audience",
        intro: "Prix par mois, en euros. Changez d’offre ou résiliez à tout moment depuis votre tableau de bord.",
        popular: "La plus choisie",
        cta: "Choisir cette offre",
        ctaFree: "Commencer gratuitement",
        soon: "Bientôt disponible",
        introBeta: "Prix par mois, en euros.",
        betaNote: "Les offres payantes ouvriront à la fin de la bêta. Commencez gratuitement dès maintenant et changez d’offre à ce moment-là.",
        listenersNote: "Auditeurs : nombre de personnes qui peuvent écouter en même temps.",
        plans: [
            {
                id: "free",
                name: "Free",
                price: "0 €",
                summary: "Pour essayer Tropicast et faire vivre une petite station.",
                features: ["1 station", "100 auditeurs", "Jusqu’à 64 kbit/s", "Opus et MP3", "Page de la station et lecteur", "Statistiques d’écoute"],
            },
            {
                id: "starter",
                name: "Starter",
                price: "19 €",
                period: "/ mois",
                summary: "Une station à l’antenne jour et nuit.",
                highlighted: true,
                features: [
                    "1 station",
                    "500 auditeurs",
                    "Jusqu’à 128 kbit/s",
                    "AutoDJ, 1 Go de musique",
                    "Référencement dans les annuaires",
                    "Tout ce qu’offre Free",
                ],
            },
            {
                id: "growth",
                name: "Growth",
                price: "55 €",
                period: "/ mois",
                summary: "Pour les radios dont l’audience grandit.",
                features: [
                    "3 stations",
                    "5 000 auditeurs",
                    "Jusqu’à 192 kbit/s",
                    "AutoDJ avec programmation, 5 Go",
                    "Lecteur pour votre site",
                    "Tout ce qu’offre Starter",
                ],
            },
            {
                id: "pro",
                name: "Pro",
                price: "120 €",
                period: "/ mois",
                summary: "Pour les réseaux et les grandes audiences.",
                features: [
                    "5 stations",
                    "25 000 auditeurs",
                    "Jusqu’à 320 kbit/s",
                    "AutoDJ avec programmation, 20 Go",
                    "Lecteur pour votre site",
                    "Tout ce qu’offre Growth",
                ],
            },
        ],
    },
    faq: {
        eyebrow: "FAQ",
        title: "Questions fréquentes",
        items: [
            {
                question: "De quoi ai-je besoin pour diffuser ?",
                answer: "D’un ordinateur sous Windows, macOS ou Linux, d’une connexion internet et d’un micro ou d’une table de mixage. Environ 1 Mbit/s en envoi suffit largement : l’application envoie votre son une seule fois, nos serveurs le distribuent à chaque auditeur.",
            },
            {
                question: "Combien de données consomment mes auditeurs ?",
                answer: "Environ 21 Mo par heure en Opus, que lisent les navigateurs récents et la plupart des applications, et environ 58 Mo par heure en MP3 à 128 kbit/s. Les lecteurs choisissent le plus léger quand ils le peuvent.",
            },
            {
                question: "Puis-je utiliser le logiciel que j’ai déjà ?",
                answer: "Oui. Tout client source Icecast, comme BUTT ou Mixxx, se connecte avec les identifiants affichés dans votre tableau de bord. L’application est la solution la plus simple, pas la seule.",
            },
            {
                question: "Que se passe-t-il si ma connexion coupe pendant une émission ?",
                answer: "Avec l’AutoDJ, votre musique prend le relais en quelques secondes et vos auditeurs restent connectés. L’application se reconnecte toute seule, et vos auditeurs retrouvent votre émission dès qu’elle y parvient.",
            },
            {
                question: "Comment payer, et puis-je résilier ?",
                answer: "Les offres payantes sont facturées chaque mois par carte bancaire via Stripe. Changez d’offre ou résiliez à tout moment depuis votre tableau de bord.",
            },
            {
                question: "Où sont vos serveurs ?",
                answer: "Dans l’Union européenne, en Allemagne. Vos auditeurs peuvent être partout dans le monde.",
            },
        ],
    },
    footer: { terms: "Conditions d’utilisation", privacy: "Confidentialité", download: "Télécharger l’application", signIn: "Se connecter" },
    notFound: {
        code: "Erreur 404",
        title: "Page introuvable",
        text: "La page que vous cherchez n’existe pas ou a été déplacée.",
        home: "Retour à l’accueil",
    },
    meta: {
        ogAlt: "Tropicast : votre radio à l’antenne en quelques minutes",
        title: "Tropicast : votre radio à l’antenne en quelques minutes",
        description:
            "Hébergement de radio en ligne : passez en direct depuis votre ordinateur, AutoDJ quand personne n’est à l’antenne, auditeurs à moins d’une seconde en Opus et MP3. Offre gratuite, sans carte bancaire.",
    },
};
