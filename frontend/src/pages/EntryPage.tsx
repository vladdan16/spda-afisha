import { Navigation } from "../components/Navigation";
import { useEntry } from "../hooks/entry";

export const path = "/entry";

export function Page() {
  const {
    loading,
    isRegistered,
    email,
    password,
    setEmail,
    setPassword,
    toggleRegistration,
    enter,
  } = useEntry();

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    enter();
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation loggedIn={false} />
      <div className="flex-grow">
        <div className="flex justify-center items-center h-full">
          {loading ? (
            <div className="loader" />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
