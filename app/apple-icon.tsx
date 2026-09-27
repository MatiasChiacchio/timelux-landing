// Icono de Apple Touch generado dinámicamente en 180x180.
// Misma composición que el favicon con un recorte algo más conservador.

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon(): ImageResponse {
  const rutaLogo: string = path.join(
    process.cwd(),
    "public",
    "TimeluxBlanco-sinFondo.png",
  );
  const base64Logo: string = `data:image/png;base64,${readFileSync(rutaLogo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base64Logo}
          alt="Timelux"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "scale(3.0)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
