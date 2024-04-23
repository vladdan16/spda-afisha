import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Feed from "../pages/FeedPage";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { AfishaContext } from "../contexts/Afisha";

export function useOnboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const { personal } = useContext(AfishaContext)!;
  const errorModal = useContext(ErrorModalContext)!;

  const onboard = async () => {
    setLoading(true);
    try {
      await personal.onboard(name, surname);
      console.log("Onboarded successfully!");
      navigate(Feed.path);
    } catch (error: any) {
      console.error("onboarding error: ", error);
      errorModal.open(error.message);
    }
    setLoading(false);
  };

  return {
    loading,
    name,
    surname,
    setName,
    setSurname,
    onboard,
  };
}
