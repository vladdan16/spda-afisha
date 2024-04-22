export function CenterH({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
}

export function CenterW({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full">{children}</div>
  );
}
