"use client";

/**
 * Sanity Studio embeddato a /studio.
 * `"use client"` è obbligatorio: Studio usa React Context (createContext)
 * e librerie browser-only, quindi non può essere un Server Component.
 *
 * Login con email/Google/GitHub. La prima persona che apre il link diventa
 * admin del progetto. Per invitare altri editor: Sanity → Manage → Members.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
