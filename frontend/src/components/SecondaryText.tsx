export function SecondaryTextWhite({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white text-xl font-semibold font-Montserrat mb-1">
      {children}
    </div>
  );
}

export function SecondaryTextBlack({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-black text-[48px] font-bold font-Montserrat py-4">
      {children}
    </div>
  );
}
