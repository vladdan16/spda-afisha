export function DefaultForm({
  onSubmit,
  children,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
      {children}
    </form>
  );
}
