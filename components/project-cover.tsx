import type { StaticImageData } from "next/image";
import { DeferredImage } from "./deferred-image";
import type { MediaSlot, ProjectMedia } from "@/content/types";

type ProjectCoverProps = {
  media: ProjectMedia;
  alt: string;
  label: string;
};

function poster(slot: MediaSlot | undefined): StaticImageData | null {
  if (!slot?.asset) return null;
  return slot.asset.kind === "image" ? slot.asset.image : slot.asset.poster;
}

export function ProjectCover({ media, alt, label }: ProjectCoverProps) {
  const desktop =
    media.layout === "desktop+phone" ? poster(media.slots[0]) : null;
  const phones =
    media.layout === "phones"
      ? media.slots.map(poster).filter((image) => image !== null)
      : [];

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface">
      {desktop ? (
        <DeferredImage
          src={desktop}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="card-shot object-cover object-top"
        />
      ) : phones.length > 0 ? (
        <div
          role="img"
          aria-label={alt}
          className="card-shot absolute inset-0 flex items-start justify-center gap-[4%] px-[8%] pt-[7%]"
        >
          {phones.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[9/19.5] w-[26%] shrink-0 overflow-hidden rounded-xl border border-line"
            >
              <DeferredImage
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 110px, (min-width: 640px) 14vw, 26vw"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="card-shot hatch absolute inset-0 grid place-items-center"
        >
          <span className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
