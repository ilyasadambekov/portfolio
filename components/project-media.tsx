import type { CSSProperties } from "react";
import type { ProjectMedia as Media } from "@/content/types";
import { MediaFrame } from "./media-frame";

type ProjectMediaProps = {
  media: Media;
  alts: readonly string[];
  fallbackAlt: string;
  labels: { desktop: string; phone: string };
};

export function ProjectMedia({
  media,
  alts,
  fallbackAlt,
  labels,
}: ProjectMediaProps) {
  const altAt = (index: number) => alts[index] ?? fallbackAlt;

  if (media.layout === "phones") {
    return (
      <div
        className="mx-auto grid max-w-3xl gap-3 sm:gap-6"
        style={
          {
            gridTemplateColumns: `repeat(${media.slots.length}, minmax(0, 1fr))`,
          } as CSSProperties
        }
      >
        {media.slots.map((slot, index) => (
          <MediaFrame
            key={index}
            slot={slot}
            alt={altAt(index)}
            placeholder={labels.phone}
            sizes="(min-width: 800px) 240px, 30vw"
            priority={index === 0}
          />
        ))}
      </div>
    );
  }

  const [desktop, phone] = media.slots;

  return (
    <div className="relative pb-[10%]">
      <MediaFrame
        slot={desktop}
        alt={altAt(0)}
        placeholder={labels.desktop}
        sizes="(min-width: 1120px) 930px, 88vw"
        priority
        className="w-[88%]"
      />
      <div className="absolute bottom-0 right-0 w-[24%] rounded-[1.25rem] shadow-[0_0_0_6px_var(--bg)]">
        <MediaFrame
          slot={phone}
          alt={altAt(1)}
          placeholder={labels.phone}
          sizes="(min-width: 1120px) 254px, 24vw"
        />
      </div>
    </div>
  );
}
