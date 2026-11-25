// Tarjeta Open Graph panorámica (1200x630) generada dinámicamente para WhatsApp y redes.
// Mantiene la identidad Warm Ivory / Light Luxury con logotipo institucional.

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const alt = "Timelux Perfumería — Perfumería Árabe & Diseñador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage(): ImageResponse {
  const rutaLogo: string = path.join(
    process.cwd(),
    "public",
    "logo-timelux-blanco.png",
  );
  const base64Logo: string = `data:image/png;base64,${readFileSync(rutaLogo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fffff4",
          padding: "56px 68px",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Marco editorial fino */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "2px solid rgba(166, 202, 235, 0.55)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Cabecera con sello rojo institucional */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#c40a0a",
              borderRadius: "999px",
              padding: "14px 34px",
              height: "76px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={base64Logo}
              alt="Timelux"
              style={{
                height: "46px",
                width: "112px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(166, 202, 235, 0.7)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#1e3a5f",
              fontSize: "20px",
              fontFamily: "sans-serif",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Perfumería Árabe &amp; Diseñador
          </div>
        </div>

        {/* Titular principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              lineHeight: 1.08,
              color: "#141416",
              fontWeight: 600,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Más que una fragancia,&nbsp;
            <span style={{ color: "#1e3a5f", fontStyle: "italic" }}>
              tu esencia
            </span>
          </div>
          <div
            style={{
              fontSize: "27px",
              lineHeight: 1.45,
              color: "#5e626e",
              fontFamily: "sans-serif",
            }}
          >
            Curaduría exclusiva de fragancias 100% originales con fijación
            duradera, asesoría personalizada y envíos a toda la Argentina.
          </div>
        </div>

        {/* Pie de confianza */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(166, 202, 235, 0.45)",
            paddingTop: "24px",
            fontFamily: "sans-serif",
            fontSize: "20px",
            color: "#1e3a5f",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", gap: "36px" }}>
            <span>100% Originales Selladas</span>
            <span>·</span>
            <span>Asesoría por WhatsApp</span>
            <span>·</span>
            <span>Envíos a todo el país</span>
          </div>
          <span style={{ color: "#c40a0a" }}>timelux-perfumes.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
