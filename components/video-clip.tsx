"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

type VideoClipProps = {
  poster: StaticImageData;
  mp4: string;
  webm?: string;
  label: string;
};

export function VideoClip({ poster, mp4, webm, label }: VideoClipProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster.src}
      aria-label={label}
      className="absolute inset-0 size-full object-cover object-top"
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
