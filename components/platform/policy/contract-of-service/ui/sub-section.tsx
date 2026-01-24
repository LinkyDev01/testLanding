export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold text-[--black] mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
