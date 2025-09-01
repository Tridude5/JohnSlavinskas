"use client";

import Image from "next/image";
import Tx from "@/components/i18n/Tx";
import { useI18n } from "@/components/i18n/I18nProvider";

type Props = {
  src: string;
  alt: string;   // english key
  label: string; // english key
  parallax?: string;
  className?: string;
  sizes?: string;
  objectPosition?: string;
  priority?: boolean;
};

export default function PhotoTile({
  src,
  alt,
  label,
  parallax = "0.08",
  className = "",
  sizes,
  objectPosition,
  priority = false,
}: Props) {
  const { t } = useI18n();

  return (
    <figure data-parallax={parallax} className={`group relative overflow-visible ${className}`} tabIndex={0}>
      <div
        className="
          relative h-full w-full overflow-hidden rounded-2xl border
          border-gray-200/30 dark:border-gray-800/50 bg-white/5
          shadow-sm transition-all duration-300 ease-out
          group-hover:scale-[1.04] group-focus-within:scale-[1.04]
          group-hover:shadow-2xl group-focus-within:shadow-2xl
          group-hover:z-10 group-focus-within:z-10
        "
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt={t(alt)}
          fill
          className="object-cover"
          sizes={sizes ?? "(max-width: 640px) 100vw, 33vw"}
          priority={priority}
          unoptimized
          style={objectPosition ? { objectPosition } : undefined}
        />
        <figcaption
          className="
            absolute bottom-2 left-2 rounded-md bg-black/60 text-white
            text-[11px] sm:text-xs px-2 py-1 backdrop-blur-sm
            transition-colors duration-200
            group-hover:bg-black/70 group-focus-within:bg-black/70
          "
        >
          <Tx>{label}</Tx>
        </figcaption>
      </div>
    </figure>
  );
}
