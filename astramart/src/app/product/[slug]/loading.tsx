export default function Loading() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="aspect-square rounded-lg bg-white/10" />
      <div>
        <div className="h-8 w-2/3 bg-white/10 rounded mb-3" />
        <div className="h-4 w-full bg-white/10 rounded mb-2" />
        <div className="h-4 w-2/3 bg-white/10 rounded mb-6" />
        <div className="h-10 w-32 bg-white/10 rounded" />
      </div>
    </section>
  );
}

