export function ErrorMsg({
  msg,
  onClose,
}: {
  msg: string;
  onClose?: () => void;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
      <p className="text-red-500 text-lg font-bold">Ошибка</p>
      <p className="mb-4">{msg}</p>
      {onClose !== undefined && (
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
        >
          Закрыть
        </button>
      )}
    </div>
  );
}
