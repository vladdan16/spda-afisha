import { Navigation } from "../components/Navigation";

export default function DashboardPage() {
  return (
    <>
      <Navigation loggedIn={true} />
      <h1 className="text-3xl font-bold underline">Dash</h1>
    </>
  );
}
