export function PrimaryTextWhite({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white text-[58px] font-semibold font-Montserrat mb-8">
      {children}
    </div>
  );
}

export function PrimaryTextBlack({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-black text-[54px] font-bold font-Montserrat">
      {children}
    </div>
  );
}
