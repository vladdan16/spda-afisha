import { Navigation } from "../components/Navigation";
import { ensureUserLoggedIn } from "../shared/loginState";
import * as Entry from "../pages/EntryPage";

export const path = "/feed";

export function Page() {
  return ensureUserLoggedIn({
    redirect: Entry.path,
    render: () => (
      <>
        <Navigation loggedIn={true} />
        <h1 className="text-3xl font-bold underline">
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
          <br />
          Feed
        </h1>
      </>
    ),
  });
}
