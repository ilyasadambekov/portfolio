"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type DeferredImageProps = Omit<ImageProps, "src" | "placeholder"> & {
  src: StaticImageData;
};

export function DeferredImage({
  src,
  alt,
  className,
  ...props
}: DeferredImageProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="absolute inset-0 block bg-cover bg-top"
      style={
        src.blurDataURL
          ? { backgroundImage: `url("${src.blurDataURL}")` }
          : undefined
      }
    >
      {near ? (
        <Image src={src} alt={alt} className={className} {...props} />
      ) : null}
    </span>
  );
}
