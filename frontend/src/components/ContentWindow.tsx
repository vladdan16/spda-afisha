export function ContentWindow({
  w,
  children,
}: {
  w: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-[${w}px] bg-gradient-to-b from-blue-800 to-indigo-400 rounded-[30px] p-8 flex flex-col items-center`}
    >
      {children}
    </div>
  );
}
