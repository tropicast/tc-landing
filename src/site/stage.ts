/**
 * `SITE_STAGE=beta` at build time (Vercel, from Terraform's `site_stage`) shows the beta banner and badge (#23). The
 * pages are static, so the value is read when they are built; at launch, set `site_stage = "live"` and apply.
 */
export const isBeta = (stage: string | undefined = process.env.SITE_STAGE) => stage === "beta";
