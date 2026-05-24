import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

/**
 * Configurazione di Sanity Studio.
 * Studio embedded nel sito Next.js alla route `/studio` (vedi
 * `src/app/studio/[[...index]]/page.tsx`).
 */
export default defineConfig({
  name: "future-campus-studio",
  title: "Future Campus Fabriano",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("Articoli")
              .schemaType("articolo")
              .child(
                S.documentTypeList("articolo")
                  .title("Articoli")
                  .defaultOrdering([{ field: "data", direction: "desc" }]),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
