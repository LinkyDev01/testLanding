export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] p-5 rounded-lg border-l-4 border-[--primary] my-5">
      {children}
    </div>
  );
}