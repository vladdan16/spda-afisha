import { useEffect, useState } from "react";
import { getToken } from "../services/Authenticator";

export function useAuthenticationCheck(expectedToBeLoggedIn: boolean) {
  const [state, setState] = useState({ loading: true, shouldNavigate: false });

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      const isActuallyLoggedIn = token !== null;

      if (expectedToBeLoggedIn !== isActuallyLoggedIn) {
        setState({ loading: false, shouldNavigate: true });
      } else {
        setState({ loading: false, shouldNavigate: false });
      }
    };

    checkLogin();
  }, [expectedToBeLoggedIn]);

  return state;
}
