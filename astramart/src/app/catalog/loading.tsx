export default function Loading() {
  return (
    <section>
      <div className="h-8 w-40 rounded bg-white/10 mb-4 animate-pulse" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="rounded-lg border border-white/10 bg-[var(--surface-2)] p-4 animate-pulse">
            <div className="aspect-video rounded-md bg-white/10 mb-3" />
            <div className="h-4 w-2/3 bg-white/10 rounded mb-2" />
            <div className="h-3 w-1/3 bg-white/10 rounded mb-2" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </li>
        ))}
      </ul>
    </section>
  );
}

