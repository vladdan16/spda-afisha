import { Navigation } from "../components/Navigation";
import { ensureUserLoggedIn } from "../shared/loginState";
import * as Entry from "../pages/EntryPage";

export const path = "/dashboard";

export function Page() {
  return ensureUserLoggedIn({
    redirect: Entry.path,
    render: () => (
      <>
        <Navigation loggedIn={true} />
        <h1 className="text-3xl font-bold underline">Dash</h1>
      </>
    ),
  });
}
