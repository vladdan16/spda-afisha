import { Navigate } from "react-router-dom";
import * as Feed from "../pages/FeedPage";
import * as Entry from "../pages/EntryPage";
import * as Onboard from "../pages/OnboardPage";
import { CenterHLoading } from "./CenterHLoading";
import { useAuthenticationCheck } from "../hooks/authentication";
import { CannotObtainAccessToken } from "../exceptions/authentication";
import { NotOnboarded } from "../exceptions/afisha";

function _loadingAndTokenOk<T>({
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

function _ensureLoginState({
  expectedToBeLoggedIn,
  render,
}: {
  expectedToBeLoggedIn: boolean;
  render: () => JSX.Element;
}) {
  return _loadingAndTokenOk({
    useDataFetch: useAuthenticationCheck,
    render: (isLoggedIn: boolean) => {
      if (expectedToBeLoggedIn !== isLoggedIn) {
        return (
          <Navigate
            to={expectedToBeLoggedIn ? Entry.path : Feed.path}
            replace
          />
        );
      }

      return render();
    },
  });
}

export function _ensureUserLoggedIn({ render }: { render: () => JSX.Element }) {
  return _ensureLoginState({ expectedToBeLoggedIn: true, render });
}

export function _ensureUserNotLoggedIn({
  render,
}: {
  render: () => JSX.Element;
}) {
  return _ensureLoginState({ expectedToBeLoggedIn: false, render });
}

export function _ensureUserOnboarded<T>({
  useDataFetch,
  render,
}: {
  useDataFetch: () => T | CannotObtainAccessToken | NotOnboarded | undefined;
  render: (data: T) => JSX.Element;
}) {
  return _loadingAndTokenOk<T | NotOnboarded>({
    useDataFetch: useDataFetch,
    render: (data: T | NotOnboarded) => {
      if (data instanceof NotOnboarded) {
        return <Navigate to={Onboard.path} replace />;
      }

      return render(data);
    },
  });
}
