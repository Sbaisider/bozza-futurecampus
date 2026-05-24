/**
 * Layout dedicato per /studio.
 * Sanity Studio richiede full-bleed senza header/footer del sito.
 * Disattiva anche il body padding del root layout.
 */
export const metadata = {
  title: "Studio · Future Campus Fabriano",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh" }}>{children}</div>;
}
