import { Navigate } from "react-router-dom";
import * as Feed from "../pages/FeedPage";
import * as Entry from "../pages/EntryPage";
import * as Onboard from "../pages/OnboardPage";
import { CenterHLoading } from "../components/CenterHLoading";
import { useAuthenticationCheck } from "../hooks/authentication";

function _ensureState(
  expectedToBeLoggedIn: boolean,
  routeFallback: string,
  render: () => JSX.Element
) {
  const isLoggedIn = useAuthenticationCheck();

  if (isLoggedIn === undefined) {
    return (
      <div className="flex flex-col h-screen">
        <CenterHLoading />
      </div>
    );
  }

  if (isLoggedIn !== expectedToBeLoggedIn) {
    return <Navigate to={routeFallback} replace />;
  }

  return render();
}

export function _ensureUserLoggedIn({ render }: { render: () => JSX.Element }) {
  return _ensureState(true, Entry.path, render);
}

export function _ensureUserNotLoggedIn({
  render,
}: {
  render: () => JSX.Element;
}) {
  return _ensureState(false, Feed.path, render);
}

// NOTE: Onboarding is stricter than ensureUserLoggedIn
// onboarded means has both firebase account logged in and has registered his name on the backend

export function _ensureUserOnboarded<T>({
  useDataFetch,
  render,
}: {
  useDataFetch: () => T | undefined | null;
  render: (data: T) => JSX.Element;
}) {
  const data = useDataFetch();

  return _ensureUserLoggedIn({
    render: () => {
      if (data === undefined) {
        return (
          <div className="flex flex-col h-screen">
            <CenterHLoading />
          </div>
        );
      }

      if (data === null) {
        return <Navigate to={Onboard.path} replace />;
      }

      return render(data);
    },
  });
}
