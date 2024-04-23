import { useContext } from "react";
import { getToken } from "../services/Authenticator";
import { AfishaContext } from "../contexts/Afisha";
import { useCheck } from "./check";
import { noOnboard2null } from "../utils/noOnboard2null";

export function useAuthenticationCheck() {
  return useCheck(async () => {
    const token = await getToken();
    const isLoggedIn = token !== null;
    return isLoggedIn;
  });
}

// returns null if not onboarded, undefined if now loading and events list if all ok
export function useOnboardingCheck_Via_MyEnrollments() {
  const { personal } = useContext(AfishaContext)!;
  return useCheck(noOnboard2null(personal.getMyEnrollments.bind(personal)));
}

// returns null if not onboarded, undefined if now loading and data if all ok
export function useOnboardingCheck_Via_MyEnrollmentsAndMyEvents() {
  const { personal } = useContext(AfishaContext)!;
  return useCheck(
    noOnboard2null(async () => {
      const enrollments = await personal.getMyEnrollments();
      const myEvents = await personal.getMyEvents();
      return { enrollments, myEvents };
    })
  );
}
