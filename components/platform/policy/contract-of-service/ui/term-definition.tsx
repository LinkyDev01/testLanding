export function TermDefinition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-[--linky-surface-alt] p-4 rounded-lg my-2.5">
      <p>
        <strong className="text-[--primary]">{term}</strong>
        {': '}
        {children}
      </p>
    </div>
  );
}