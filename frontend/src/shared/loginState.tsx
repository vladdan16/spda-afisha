import { Navigate } from "react-router-dom";
import { getToken } from "../services/TokenStore";

function _ensureState(
  expectedToBeLoggedIn: boolean,
  routeFallback: string,
  render: () => JSX.Element
) {
  const isActuallyLoggedIn = getToken() !== null;
  if (expectedToBeLoggedIn !== isActuallyLoggedIn) {
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
