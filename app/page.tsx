export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d11] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <span className="mb-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
          Próximamente
        </span>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          TIMELUX
        </h1>
        <p className="mt-3 max-w-md text-sm text-neutral-400">
          Perfumería árabe y fragancias de diseñador. Alta fijación y elegancia atemporal.
        </p>
      </div>
    </main>
  );
}