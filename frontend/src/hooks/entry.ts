import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Feed from "../pages/FeedPage";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { enterWithEmailAndPassword } from "../services/Authenticator";

export function useEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorModal = useContext(ErrorModalContext)!;

  const toggleRegistration = () => {
    setIsRegistered((was) => !was);
  };

  const enter = async () => {
    setLoading(true);
    try {
      await enterWithEmailAndPassword(!isRegistered, email, password);
      console.log("Entered successfully!");
      navigate(Feed.path);
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
