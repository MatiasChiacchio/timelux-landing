'use client';

// Asistente guiado para redactar consultas directas por WhatsApp sin checkout ni formularios pesados.
// Client Component: gestiona el motivo seleccionado y el detalle opcional en tiempo real.

import { useMemo, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { getWhatsAppLink } from "@/src/config/site";

// Identificador de cada tipo de consulta disponible.
type MotivoConsultaId = "recomendacion" | "encargo" | "stock" | "envios";

// Definición tipada de un motivo de contacto.
interface MotivoConsulta {
  id: MotivoConsultaId;
  etiqueta: string;
  prefijoMensaje: string;
  placeholderDetalle: string;
}

const motivos: MotivoConsulta[] = [
  {
    id: "recomendacion",
    etiqueta: "Asesoría para elegir",
    prefijoMensaje:
      "¡Hola Timelux! Quiero asesoramiento para elegir una fragancia.",
    placeholderDetalle:
      "Ej.: Me gustan los aromas cálidos con vainilla o ámbar para salidas nocturnas...",
  },
  {
    id: "encargo",
    etiqueta: "Perfume por encargo",
    prefijoMensaje:
      "¡Hola Timelux! Estoy buscando un perfume específico por encargo.",
    placeholderDetalle:
      "Ej.: Nombre, marca y presentación en ml del perfume que querés encargar...",
  },
  {
    id: "stock",
    etiqueta: "Stock y precio",
    prefijoMensaje:
      "¡Hola Timelux! Quiero consultar disponibilidad y precio vigente.",
    placeholderDetalle:
      "Ej.: Khamrah de Lattafa 100 ml o Bleu de Chanel...",
  },
  {
    id: "envios",
    etiqueta: "Envíos y pagos",
    prefijoMensaje:
      "¡Hola Timelux! Tengo una consulta sobre envíos o medios de pago.",
    placeholderDetalle:
      "Ej.: Envío a Córdoba por Correo Argentino, pago en USDT o seña en Formosa...",
  },
];

// Constructor interactivo de enlace codificado hacia WhatsApp.
export default function AsistenteWhatsApp(): React.JSX.Element {
  const [motivoActivo, setMotivoActivo] =
    useState<MotivoConsultaId>("recomendacion");
  const [detalle, setDetalle] = useState<string>("");

  const motivoSeleccionado: MotivoConsulta = useMemo(
    () =>
      motivos.find((item: MotivoConsulta) => item.id === motivoActivo) ??
      motivos[0],
    [motivoActivo],
  );

  // Mensaje final saneado que se envía codificado a wa.me.
  const mensajeGenerado: string = useMemo(() => {
    const detalleLimpio: string = detalle.trim();
    if (!detalleLimpio) {
      return motivoSeleccionado.prefijoMensaje;
    }
    return `${motivoSeleccionado.prefijoMensaje} Detalle: ${detalleLimpio}`;
  }, [motivoSeleccionado, detalle]);

  const enlaceWhatsApp: string = getWhatsAppLink(mensajeGenerado);

  return (
    <div className="rounded-3xl border border-[#a6caeb]/45 bg-white/90 p-6 shadow-md shadow-[#1e3a5f]/5 sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]">
        <Sparkles size={14} aria-hidden="true" />
        Consulta Rápida por WhatsApp
      </div>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-[#141416]">
        Armá tu mensaje en segundos
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5e626e]">
        Elegí el motivo de tu consulta y sumá un comentario opcional. Al tocar
        el botón se abrirá WhatsApp con todo listo.
      </p>

      {/* Selector de motivo en píldoras accesibles */}
      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
          1. ¿En qué te podemos ayudar?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {motivos.map((motivo: MotivoConsulta) => {
            const seleccionado: boolean = motivo.id === motivoActivo;
            return (
              <button
                key={motivo.id}
                type="button"
                aria-pressed={seleccionado}
                onClick={(): void => setMotivoActivo(motivo.id)}
                className={`min-h-[44px] cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-sm ${
                  seleccionado
                    ? "bg-[#c40a0a] text-[#fffff4] shadow-sm"
                    : "border border-[#a6caeb]/50 bg-[#a6caeb]/20 text-[#141416] hover:bg-[#a6caeb]/40"
                }`}
              >
                {motivo.etiqueta}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Campo opcional para personalizar la consulta */}
      <div className="mt-6">
        <label
          htmlFor="detalle-consulta"
          className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]"
        >
          2. Contanos qué buscás (opcional)
        </label>
        <textarea
          id="detalle-consulta"
          rows={3}
          value={detalle}
          onChange={(evento: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setDetalle(evento.target.value)
          }
          placeholder={motivoSeleccionado.placeholderDetalle}
          className="mt-2.5 w-full rounded-2xl border border-[#a6caeb]/45 bg-white px-4 py-3 text-sm text-[#141416] placeholder:text-[#5e626e] focus:border-[#c40a0a] focus:outline-none focus:ring-2 focus:ring-[#c40a0a]/60"
        />
      </div>

      {/* Vista previa transparente del texto que se enviará */}
      <div className="mt-5 rounded-2xl border border-[#a6caeb]/35 bg-[#fffff4] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">
          Vista previa del mensaje
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[#5e626e]">
          {mensajeGenerado}
        </p>
      </div>

      {/* CTA principal hacia WhatsApp */}
      <a
        href={enlaceWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#c40a0a] px-6 py-3.5 text-sm font-semibold text-[#fffff4] shadow-md shadow-[#c40a0a]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a30808] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Abrir conversación en WhatsApp
      </a>
    </div>
  );
}
