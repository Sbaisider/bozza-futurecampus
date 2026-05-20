import type { ReactNode } from "react";

import { SiteNavbar } from "@/components/home/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";

type PageShellProps = {
  children: ReactNode;
  /** Spazio sopra il primo blocco contenuto (sotto la navbar). Default true. */
  withTopGap?: boolean;
};

/**
 * Wrapper per tutte le pagine interne (non-Home).
 * Aggiunge Navbar in cima (fixed) e Footer in fondo, con il giusto offset.
 */
export function PageShell({ children, withTopGap = true }: PageShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteNavbar className="sticky top-0 z-50" />
      <main className={`flex-1 ${withTopGap ? "" : ""}`}>{children}</main>
      <SiteFooter />
    </div>
  );
}
