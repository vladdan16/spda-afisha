import { getToken } from "../services/Authenticator";
import { CannotObtainAccessToken } from "../exceptions/authentication";
import { useEffect, useState } from "react";
import { delay } from "../utils/async";

export function useAuthenticationCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState<
    undefined | boolean | CannotObtainAccessToken
  >(undefined);

  async function _check() {
    while (true) {
      try {
        const token = await getToken();
        const isLoggedIn = token !== null;
        setIsLoggedIn(isLoggedIn);
        break;
      } catch (err: any) {
        if (err instanceof CannotObtainAccessToken) {
          return setIsLoggedIn(err);
        }
        console.error(err);
        console.log("Retrying in 5 seconds...");
        await delay(500);
      }
    }
  }

  useEffect(() => {
    _check();
  }, []);

  return isLoggedIn;
}
