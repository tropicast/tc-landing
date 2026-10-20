// Lighthouse CI (#7): both languages, the production build, mobile (Lighthouse's default: a mid-range phone on a
// throttled slow 4G network). Three runs each; the median is asserted.
module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run start -- -p 3200",
            startServerReadyPattern: "Ready",
            startServerReadyTimeout: 60000,
            url: ["http://localhost:3200/fr", "http://localhost:3200/en"],
            numberOfRuns: 3,
            settings: { chromeFlags: "--no-sandbox --headless=new" },
        },
        assert: {
            aggregationMethod: "median",
            // Lighthouse simulates the throttled phone from a trace taken at full speed: on one machine the same build
            // scores 0.79-0.97 and LCP 1.9-3.4 s from run to run, so speed only warns (target, #7: 0.95 and 2.5 s; main
            // before #7 scored 0.71-0.75 with up to 1.6 s of blocking time). What is stable fails the build.
            assertions: {
                "categories:performance": ["warn", { minScore: 0.9 }],
                "largest-contentful-paint": ["warn", { maxNumericValue: 3000 }],
                "total-blocking-time": ["warn", { maxNumericValue: 300 }],
                "categories:accessibility": ["error", { minScore: 0.95 }],
                "categories:best-practices": ["error", { minScore: 0.95 }],
                "categories:seo": ["error", { minScore: 0.95 }],
                "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
            },
        },
        upload: { target: "filesystem", outputDir: ".lighthouseci/reports" },
    },
};
