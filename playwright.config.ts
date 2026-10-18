import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);

/** Against the production build (`next start`), as Vercel serves it. Mobile first: the target markets browse on phones. */
export default defineConfig({
    testDir: "e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
    use: { baseURL: `http://localhost:${port}`, trace: "retain-on-failure" },
    projects: [
        { name: "mobile", use: { ...devices["Pixel 7"] } },
        { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    ],
    webServer: { command: `npm run start -- -p ${port}`, port, reuseExistingServer: !process.env.CI },
});
