import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline-light";
  className?: string;
  external?: boolean;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-[12px] font-black tracking-[0.18em] uppercase transition focus:outline-none focus:ring-2 focus:ring-fc-accent/60 focus:ring-offset-2";
  const variants: Record<NonNullable<CtaButtonProps["variant"]>, string> = {
    primary:
      "rounded-full bg-fc-primary text-white shadow-sm hover:bg-fc-accent",
    ghost:
      "rounded-full border border-fc-primary/25 bg-white text-fc-primary hover:border-fc-primary/55",
    "outline-light":
      "rounded-full border border-white/35 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/[0.12]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  const style = { fontFamily: "var(--font-montserrat), system-ui, sans-serif" };

  if (external) {
    return (
      <a href={href} className={cls} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}
