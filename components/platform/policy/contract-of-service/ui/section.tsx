export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-[--primary] mb-5 pb-2.5 border-b border-[--linky-border]">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}