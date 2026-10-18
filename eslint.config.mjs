import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
    ...nextVitals,
    ...nextTs,
    {
        ignores: [
            ".next/**",
            "out/**",
            "playwright-report/**",
            "test-results/**",
            "next-env.d.ts",
            // Untitled UI's own code, added and updated by `npx untitledui add`: kept as published.
            "src/components/**",
            "src/hooks/**",
            "src/utils/**",
        ],
    },
];

export default config;
