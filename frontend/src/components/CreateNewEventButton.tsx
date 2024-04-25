export function CreateNewEventButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[400px] h-12 flex justify-left items-center"
    >
      <img alt="plus" className="w-10 h-10" src="/Plus.png" />
      <div className="text-black text-2xl font-black font-Montserrat ml-2">
        Создать новый ивент
      </div>
    </button>
  );
}
