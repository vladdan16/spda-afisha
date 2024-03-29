import React, { useState } from "react";

export default function EntryPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleRegistration = () => {
    setIsRegistered((was: boolean) => !was);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[724px] bg-gradient-to-b from-blue-800 to-indigo-400 rounded-[30px] p-8 flex flex-col items-center">
        <div className="text-white text-[58px] font-semibold font-Montserrat mb-8">
          {isRegistered ? "Вход" : "Регистрация"}
        </div>
        <div className="relative mb-8 w-full">
          <input
            type="text"
            className="w-full h-[68px] bg-white rounded-[20px] shadow p-4 text-black text-opacity-50 text-[32px] font-medium font-Montserrat"
            placeholder="Логин"
          />
        </div>
        <div className="relative mb-8 w-full">
          <input
            type="password"
            className="w-full h-[68px] bg-white rounded-[20px] shadow p-4 text-black text-opacity-50 text-[32px] font-medium font-Montserrat"
            placeholder="Пароль"
          />
        </div>

        <>
          <button className="h-[61px] px-8 bg-amber-500 rounded-[20px] text-white text-[32px] font-bold font-Montserrat mb-6">
            {isRegistered ? "Войти" : "Зарегистрироваться"}
          </button>
          <div className="text-white text-xl font-semibold font-Montserrat mb-1">
            или
          </div>
          <button
            className="text-white text-xl font-bold font-Montserrat"
            onClick={toggleRegistration}
          >
            {isRegistered ? "зарегистрироваться" : "войти"}
          </button>
        </>
      </div>
    </div>
  );
}
