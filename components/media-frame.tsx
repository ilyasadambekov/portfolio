import Image from "next/image";
import type { MediaSlot } from "@/content/types";
import { VideoClip } from "./video-clip";

type MediaFrameProps = {
  slot: MediaSlot;
  alt: string;
  placeholder: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function MediaFrame({
  slot,
  alt,
  placeholder,
  sizes,
  priority = false,
  className = "",
}: MediaFrameProps) {
  const shape =
    slot.device === "phone"
      ? "aspect-[9/19.5] rounded-[1.25rem]"
      : "aspect-[16/10] rounded-lg";
  const asset = slot.asset;

  return (
    <div
      className={`relative overflow-hidden border border-line bg-surface ${shape} ${className}`}
    >
      {asset?.kind === "image" ? (
        <Image
          src={asset.image}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          placeholder="blur"
          className="object-cover object-top"
        />
      ) : asset?.kind === "video" ? (
        <VideoClip
          poster={asset.poster}
          mp4={asset.mp4}
          webm={asset.webm}
          label={alt}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="hatch @container absolute inset-0 grid place-items-center p-2"
        >
          <span className="hidden max-w-full rounded-full border border-line bg-bg px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted @[9rem]:inline-block sm:text-[11px]">
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
