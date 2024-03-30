import { useState } from "react";
import { Navigation } from "../components/Navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const ErrorModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
      <p className="text-red-500 text-lg font-bold">Ошибка</p>
      <p className="mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
      >
        Закрыть
      </button>
    </div>
  </div>
);

export default function EntryPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleRegistration = () => {
    setIsRegistered((was) => !was);
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const entry = isRegistered
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
      await entry(auth, email, password);
      console.log("Entered successfully!");
    } catch (error: any) {
      console.error("Authentication error: ", error);
      setErrorMessage(error.message);
      setShowModal(true);
    }
  };

  // Function to close the modal
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col h-screen">
      <Navigation loggedIn={false} />
      {showModal && <ErrorModal message={errorMessage} onClose={closeModal} />}
      <div className="flex-grow">
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-[724px] bg-gradient-to-b from-blue-800 to-indigo-400 rounded-[30px] p-8 flex flex-col items-center">
              <div className="text-white text-[58px] font-semibold font-Montserrat mb-8">
                {isRegistered ? "Вход" : "Регистрация"}
              </div>
              <form
                onSubmit={handleAuth}
                className="w-full flex flex-col items-center"
              >
                <div className="mb-8 w-full">
                  <input
                    type="email"
                    className="w-full h-[68px] bg-white rounded-[20px] shadow p-4 text-black text-opacity-50 text-[32px] font-medium font-Montserrat"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-8 w-full">
                  <input
                    type="password"
                    className="w-full h-[68px] bg-white rounded-[20px] shadow p-4 text-black text-opacity-50 text-[32px] font-medium font-Montserrat"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="h-[61px] px-8 bg-amber-500 rounded-[20px] text-white text-[32px] font-bold font-Montserrat mb-6"
                  >
                    {isRegistered ? "Войти" : "Зарегистрироваться"}
                  </button>
                </div>
              </form>
              <div className="text-white text-xl font-semibold font-Montserrat mb-1">
                или
              </div>
              <button
                type="button"
                className="text-white text-xl font-bold font-Montserrat"
                onClick={toggleRegistration}
              >
                {isRegistered ? "зарегистрироваться" : "войти"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
