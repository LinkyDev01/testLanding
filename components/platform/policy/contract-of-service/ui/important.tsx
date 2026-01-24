export function Important({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] p-5 rounded-lg border-l-4 border-[--linky-error] my-5">
      {children}
    </div>
  );
}
