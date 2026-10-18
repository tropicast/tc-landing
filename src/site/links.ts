/** Where the site sends people: the app (sign-up, sign-in, legal pages, downloads). */
export const APP_URL = "https://app.tropicastradio.com";
export const SIGN_UP_URL = `${APP_URL}/signup`;
export const TERMS_URL = `${APP_URL}/terms`;
export const PRIVACY_URL = `${APP_URL}/privacy`;

/** Tropicast Station's latest release, served by tc-dashboard (`/download/station/{platform}`, tc-station#72). */
export const downloadUrl = (platform: string) => `${APP_URL}/download/station/${platform}`;
export const INSTALL_GUIDE_URL = downloadUrl("readme");

/**
 * The station the demo plays, as `tenant-slug/station-slug` (its public page is `/listen/<that>`). Set
 * `DEMO_STATION` at build time (Vercel project setting); the station's plan must include the website player.
 */
export const demoEmbedUrl = (station: string | undefined) =>
    station && /^[a-z0-9-]{3,64}\/[a-z0-9-]{3,64}$/.test(station) ? `${APP_URL}/embed/${station}` : undefined;
