export function CrossIconButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button onClick={onClick}>
      <img alt="plus" className="w-8 h-8" src="/Close.png" />
    </button>
  );
}
