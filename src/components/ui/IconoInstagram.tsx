// Icono vectorial oficial de Instagram (glifo de marca en estilo lineal).
// Componente propio porque la versión instalada de lucide-react
// ya no exporta iconos de marcas.

// Propiedades: tamaño en píxeles y clases extra de presentación.
interface PropiedadesIconoInstagram {
  size?: number;
  className?: string;
}

// Glifo de Instagram con trazo currentColor, coherente con lucide-react.
export default function IconoInstagram({
  size = 24,
  className = "",
}: PropiedadesIconoInstagram): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
