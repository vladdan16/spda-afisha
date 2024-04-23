import { Navigation } from "../components/Navigation";

export const path = "/dashboard";

export function Page() {
  return (
    <>
      <Navigation loggedIn={true} />
      <h1 className="text-3xl font-bold underline">Dash</h1>
    </>
  );
}
