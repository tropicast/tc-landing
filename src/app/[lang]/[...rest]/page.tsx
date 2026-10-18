import { notFound } from "next/navigation";

/** Any other path under a language: the 404 page, in that language and with the site's layout. */
export default function NotFoundCatchAll() {
    notFound();
}
