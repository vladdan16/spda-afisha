export function Modal({
  z,
  children,
  onClose,
}: {
  z: number;
  children: React.ReactNode;
  onClose: (() => void) | undefined;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-${z}`}
        onClick={onClose}
      >
        {children}
      </div>
    </>
  );
}
