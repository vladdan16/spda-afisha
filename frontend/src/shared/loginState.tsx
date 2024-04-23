import { Navigate } from "react-router-dom";
import * as Feed from "../pages/FeedPage";
import * as Entry from "../pages/EntryPage";
import * as Onboard from "../pages/OnboardPage";
import { CenterHLoading } from "../components/CenterHLoading";
import { useAuthenticationCheck } from "../hooks/authentication";
import { CannotObtainAccessToken } from "../exceptions/authention";
import { NotOnboarded } from "../exceptions/afisha";

function _ensureNotLoadingAndTokenOk<T>({
  useDataFetch,
  render,
}: {
  useDataFetch: () => T | CannotObtainAccessToken | undefined;
  render: (data: T) => JSX.Element;
}) {
  const data = useDataFetch();

  if (data === undefined) {
    return (
      <div className="flex flex-col h-screen">
        <CenterHLoading />
      </div>
    );
  }

  if (data instanceof CannotObtainAccessToken) {
    return <Navigate to={Entry.path} replace />;
  }

  return render(data);
}

export function _ensureUserNotLoggedIn({
  render,
}: {
  render: () => JSX.Element;
}) {
  return _ensureNotLoadingAndTokenOk({
    useDataFetch: useAuthenticationCheck,
    render: (data: boolean) => {
      const isLoggedIn = data;
      if (isLoggedIn) {
        return <Navigate to={Feed.path} replace />;
      }

      return render();
    },
  });
}

export function _ensureUserOnboarded<T>({
  useDataFetch, // use useOnboardingCheck_Via_* from ../hooks/authentication.ts
  render,
}: {
  useDataFetch: () => T | CannotObtainAccessToken | NotOnboarded | undefined;
  render: (data: T) => JSX.Element;
}) {
  return _ensureNotLoadingAndTokenOk<T | NotOnboarded>({
    useDataFetch: useDataFetch,
    render: (data: T | NotOnboarded) => {
      if (data instanceof NotOnboarded) {
        return <Navigate to={Onboard.path} replace />;
      }

      return render(data);
    },
  });
}
