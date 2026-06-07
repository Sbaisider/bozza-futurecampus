import type { Metadata } from "next";

import { HomeExperience } from "@/components/home/HomeExperience";
import { contatti } from "@/content/contatti";
import { cosaEFutureCampus, siteInfo } from "@/content/info";
import { getHeroFotoPaths } from "@/lib/get-hero-foto-paths";
import { getPublicVideoPaths } from "@/lib/get-public-video-paths";
import { pickHomeMedia } from "@/lib/home-media-picks";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.futurecampus.it";

export const metadata: Metadata = {
  title: {
    absolute:
      "Future Campus Fabriano — formazione esperienziale gratuita per le scuole superiori",
  },
  description:
    "Non un semplice campus, ma un'esperienza di vita. Sei settimane di laboratori, visite in azienda e incontri con imprenditori per i ragazzi delle scuole superiori di Fabriano. Gratuito. Un marchio di Confindustria Ancona.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Future Campus Fabriano — l'esperienza che cambia lo sguardo sul territorio",
    description:
      "Sei settimane di formazione esperienziale, gratuite per i ragazzi delle scuole superiori di Fabriano e dintorni.",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Future Campus Fabriano" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteInfo.nome,
  alternateName: "Future Campus",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/fcf-logo.svg`,
  image: `${SITE_URL}/og.jpg`,
  description: cosaEFutureCampus.shortLead,
  email: contatti.emailPubblica,
  parentOrganization: { "@type": "Organization", name: siteInfo.marchioDi },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fabriano",
    addressRegion: "AN",
    addressCountry: "IT",
  },
  sameAs: [
    "https://www.instagram.com/futurecampusfabriano/",
    "https://www.facebook.com/ConfindustriaFABRIANO/",
  ],
};

export default function Home() {
  const heroImages = getHeroFotoPaths();
  const videos = getPublicVideoPaths();
  const media = pickHomeMedia(heroImages, videos);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeExperience heroImages={heroImages} media={media} />
    </>
  );
}
