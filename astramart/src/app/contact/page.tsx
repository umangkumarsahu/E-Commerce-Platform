export default function ContactPage() {
  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" rows={4} />
        </div>
        <button type="button" className="btn-primary px-4 py-2 rounded-md">Send</button>
      </form>
    </section>
  );
}

