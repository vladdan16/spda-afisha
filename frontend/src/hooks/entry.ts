import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { ErrorModalContext } from "../components/ErrorModal";
import { setToken } from "../services/TokenStore";

export function useEntry() {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorModal = useContext(ErrorModalContext);

  const toggleRegistration = () => {
    setIsRegistered((was) => !was);
  };

  const enter = async () => {
    setLoading(true);
    try {
      const entry = isRegistered
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
      const res = await entry(auth, email, password);

      setToken(await res.user.getIdToken());

      console.log("Entered successfully!");
    } catch (error: any) {
      console.error("Authentication error: ", error);
      errorModal.open(error.message);
    }
    setLoading(false);
  };

  return {
    loading,
    isRegistered,
    email,
    password,
    setEmail,
    setPassword,
    toggleRegistration,
    enter,
  };
}
