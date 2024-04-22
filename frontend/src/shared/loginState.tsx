import { Navigate } from "react-router-dom";
import { useAuthenticationCheck } from "../hooks/authentication";
import { CenterLoading } from "../components/CenterLoading";

function _ensureState(
  expectedToBeLoggedIn: boolean,
  routeFallback: string,
  render: () => JSX.Element
) {
  const { loading, shouldNavigate } =
    useAuthenticationCheck(expectedToBeLoggedIn);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <CenterLoading />
      </div>
    );
  }

  if (shouldNavigate) {
    return <Navigate to={routeFallback} replace />;
  }

  return render();
}

export function ensureUserLoggedIn({
  redirect,
  render,
}: {
  redirect: string;
  render: () => JSX.Element;
}) {
  return _ensureState(true, redirect, render);
}

export function ensureUserNotLoggedIn({
  redirect,
  render,
}: {
  redirect: string;
  render: () => JSX.Element;
}) {
  return _ensureState(false, redirect, render);
}
