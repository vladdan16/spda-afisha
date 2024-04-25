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

export function SecondaryTextWhite2({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white text-2xl font-bold font-Montserrat mb-1">
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
