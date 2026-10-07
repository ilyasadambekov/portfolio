import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  rows: readonly (readonly [string, string])[];
};

const fontsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
]);

const ink = "#161615";
const muted = "#64635e";
const paper = "#f7f6f3";
const line = "#d9d7cf";
const accent = "#1d7348";

export async function renderOgCard({
  eyebrow,
  title,
  body,
  rows,
}: OgCardProps) {
  const [sans, mono] = await fontsPromise;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: paper,
        color: ink,
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: accent,
            }}
          />
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            lineHeight: 1.35,
            color: muted,
            maxWidth: 940,
          }}
        >
          {body}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist Mono",
          fontSize: 22,
        }}
      >
        {rows.map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingTop: 12,
              paddingBottom: 12,
              borderTop: `1px solid ${line}`,
            }}
          >
            <span style={{ color: muted }}>{label}</span>
            <span
              style={{
                flex: 1,
                margin: "0 16px 6px",
                borderBottom: `2px dashed ${line}`,
              }}
            />
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
