import type { Rule, SchemaTypeDefinition } from "sanity";

/**
 * Schema dell'articolo blog.
 * Definisce i campi che compaiono in Sanity Studio quando l'editor crea/edita
 * un articolo: titolo, sommario, data, categoria, copertina, corpo (rich text),
 * autore. Compatibile con il type `Articolo` usato dalle pagine /blog.
 */
export const articolo: SchemaTypeDefinition = {
  name: "articolo",
  title: "Articolo",
  type: "document",
  fields: [
    {
      name: "titolo",
      title: "Titolo",
      type: "string",
      validation: (rule: Rule) =>
        rule.required().min(8).max(120).warning("Tra 8 e 120 caratteri."),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      description:
        "Identificatore unico nell'URL: /blog/<slug>. Usa parole separate da trattini.",
      type: "slug",
      options: {
        source: "titolo",
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
            .slice(0, 80),
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "sommario",
      title: "Sommario",
      description:
        "1-2 frasi che compaiono nel listing del blog e sotto il titolo dell'articolo.",
      type: "text",
      rows: 3,
      validation: (rule: Rule) => rule.required().min(20).max(300),
    },
    {
      name: "data",
      title: "Data pubblicazione",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "categoria",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Aggiornamenti", value: "Aggiornamenti" },
          { title: "Storie", value: "Storie" },
          { title: "Territorio", value: "Territorio" },
          { title: "Formazione", value: "Formazione" },
        ],
        layout: "radio",
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "copertina",
      title: "Foto di copertina",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Testo alternativo (accessibilità)",
          type: "string",
        },
      ],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "corpo",
      title: "Corpo dell'articolo",
      description: "Scrivi qui il contenuto. Puoi usare grassetto, corsivo, link, immagini, citazioni, liste.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragrafo", value: "normal" },
            { title: "Titolo H2", value: "h2" },
            { title: "Titolo H3", value: "h3" },
            { title: "Citazione", value: "blockquote" },
          ],
          lists: [
            { title: "Punti", value: "bullet" },
            { title: "Numerata", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule: Rule) => rule.required(),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Testo alternativo", type: "string" },
            { name: "caption", title: "Didascalia", type: "string" },
          ],
        },
      ],
      validation: (rule: Rule) => rule.required().min(1),
    },
    {
      name: "autore",
      title: "Autore (opzionale)",
      type: "string",
    },
  ],
  orderings: [
    {
      title: "Più recente",
      name: "dataDesc",
      by: [{ field: "data", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titolo",
      subtitle: "data",
      media: "copertina",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `📅 ${subtitle}` : undefined,
        media,
      };
    },
  },
};
