export function InkWellButton({
  type,
  onClick,
  children,
}: {
  type: "submit" | "reset" | "button" | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      className="text-white text-xl font-bold font-Montserrat"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
