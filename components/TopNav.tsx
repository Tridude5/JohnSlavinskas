"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Tx from "@/components/i18n/Tx";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all",
        "border-b",
        scrolled
          ? "backdrop-blur bg-black/40 border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,.5)]"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <nav className="container max-w-6xl px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href={"."} className="font-semibold tracking-tight">
          John (Jack) Slavinskas
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href={"#about"} className="hover:opacity-80 transition"><Tx>About</Tx></Link>
          <Link href={"projects"} className="hover:opacity-80 transition"><Tx>Projects</Tx></Link>
          <Link href={"resume"} className="hover:opacity-80 transition"><Tx>Resume</Tx></Link>
        </div>
      </nav>
    </div>
  );
}
