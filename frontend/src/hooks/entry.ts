import { useContext, useState } from "react";
import { ErrorModalContext } from "../context/ErrorModalContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

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
      await entry(auth, email, password);
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
