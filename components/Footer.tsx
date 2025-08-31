"use client";

import Link from "next/link";
import EmailLink from "@/components/EmailLink";
import Tx from "@/components/i18n/Tx";

function FooterLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="
        rounded-lg px-3 py-1.5 text-sm
        text-gray-700 dark:text-gray-300
        hover:text-emerald-400 hover:bg-black/5 dark:hover:bg-white/5
        transition-colors
      "
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* left: copyright */}
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            © {year} John Slavinskas
          </p>

          {/* right: actions */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {/* email as a subtle pill */}
            <span className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <EmailLink />
            </span>

            {/* divider dot for larger screens */}
            <span className="hidden sm:inline text-gray-400">•</span>

            <FooterLink href="/legal/imprint" ariaLabel="Imprint">
              <Tx>Imprint</Tx>
            </FooterLink>

            <span className="hidden sm:inline text-gray-400">•</span>

            <FooterLink href="/legal/privacy" ariaLabel="Privacy">
              <Tx>Privacy</Tx>
            </FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
