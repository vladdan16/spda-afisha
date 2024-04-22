import { Navigation } from "./Navigation";

export function DefaultLayout({
  loggedIn,
  children,
}: {
  loggedIn: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navigation loggedIn={loggedIn} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
