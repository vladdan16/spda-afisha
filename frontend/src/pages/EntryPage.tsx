import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function EntryPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleRegistration = () => {
    setIsRegistered((was) => !was);
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isRegistered) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in successfully!");
        console.log(res);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered successfully!");
        console.log(res);
      }
    } catch (error) {
      console.error("Authentication error: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation loggedIn={false} />
      <div className="flex-grow">
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
  );
}
