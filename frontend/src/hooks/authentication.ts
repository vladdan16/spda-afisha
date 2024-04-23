import { useContext } from "react";
import { getToken } from "../services/Authenticator";
import { AfishaContext } from "../contexts/Afisha";
import { useExecTrunk } from "./trunk";
import { NotOnboarded } from "../exceptions/afisha";
import { CannotObtainAccessToken } from "../exceptions/authention";

// Utilities and helpers for ts to typecheck it

function _exception2Rt<T>(
  filter: (err: any) => boolean,
  func: () => Promise<T>
) {
  return async () => {
    try {
      return await func();
    } catch (err: any) {
      if (filter(err)) {
        return err;
      }
      throw err;
    }
  };
}

function _tokenException2Rt<T>(
  func: () => Promise<T>
): () => Promise<T | CannotObtainAccessToken> {
  return _exception2Rt(
    (err: any) => err instanceof CannotObtainAccessToken,
    func
  );
}

function _onboardException2Rt<T>(
  func: () => Promise<T>
): () => Promise<T | NotOnboarded | CannotObtainAccessToken> {
  return _exception2Rt(
    (err) =>
      err instanceof NotOnboarded || err instanceof CannotObtainAccessToken,
    func
  );
}

// Implementation zone

export function useAuthenticationCheck() {
  return useExecTrunk(
    _tokenException2Rt(async () => {
      const token = await getToken();
      const isLoggedIn = token !== null;
      return isLoggedIn;
    })
  );
}

export function useOnboardingCheck_Via_MyEnrollments() {
  const { personal } = useContext(AfishaContext)!;
  return useExecTrunk(
    _onboardException2Rt(personal.getMyEnrollments.bind(personal))
  );
}

export function useOnboardingCheck_Via_MyEnrollmentsAndMyEvents() {
  const { personal } = useContext(AfishaContext)!;
  return useExecTrunk(
    _onboardException2Rt(async () => {
      const enrollments = await personal.getMyEnrollments();
      const myEvents = await personal.getMyEvents();
      return { enrollments, myEvents };
    })
  );
}
