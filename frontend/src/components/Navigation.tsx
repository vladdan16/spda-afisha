import { Link } from "react-router-dom";

export function Navigation() {
  // TODO: log out, then goto /entry on Выйти
  return (
    <nav className="h-[100px] flex justify-between px-20 bg-white items-center">
      <Link to="/feed">
        <div className="text-blue-800 text-[40px] font-black font-Montserrat">
          Aфиша
        </div>
      </Link>
      <div className="flex items-center">
        <Link to="/dashboard" className="mr-8">
          <div className="text-black text-[32px] font-bold font-Montserrat">
            Мои ивенты
          </div>
        </Link>
        <Link to="/entry">
          <div className="text-black text-[32px] font-semibold font-Montserrat">
            выйти
          </div>
        </Link>
      </div>
    </nav>
  );
}
