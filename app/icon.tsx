// Favicon generado dinámicamente en 32x32.
// Usa el isotipo blanco sobre rojo y lo amplía para que llene la pestaña.

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon(): ImageResponse {
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
            transform: "scale(3.4)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
