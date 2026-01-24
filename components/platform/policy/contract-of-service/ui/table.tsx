export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full border-collapse my-5 border border-[--linky-border]">
      {children}
    </table>
  );
}