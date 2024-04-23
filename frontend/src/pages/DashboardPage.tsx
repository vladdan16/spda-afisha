import { Navigation } from "../components/Navigation";
import { useOnboardingCheck_Via_MyEnrollmentsAndMyEvents } from "../hooks/authentication";
import { _ensureUserOnboarded } from "../shared/loginState";

export const path = "/dashboard";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useOnboardingCheck_Via_MyEnrollmentsAndMyEvents,
    render: () => (
      <>
        <Navigation loggedIn={true} />
        <h1 className="text-3xl font-bold underline">Dash</h1>
      </>
    ),
  });
}
