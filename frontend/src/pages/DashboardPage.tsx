import { Navigation } from "../components/Navigation";
import { _ensureUserLoggedIn } from "../shared/loginState";

export const path = "/dashboard";

export function Page() {
  return _ensureUserLoggedIn({
    render: () => (
      <>
        <Navigation loggedIn={true} />
        <h1 className="text-3xl font-bold underline">Dash</h1>
      </>
    ),
  });
}
