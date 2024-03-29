import { Link } from "react-router-dom";

export function Navigation() {
  // TODO: log out, then goto /entry on Выйти
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
      <span className="font-bold">
        <Link to="/feed" className="mr-2">
          Афиша
        </Link>
      </span>

      <span>
        <Link to="/dashboard" className="mr-2">
          Мои ивенты
        </Link>
        <Link to="/entry">Выйти</Link>
      </span>
    </nav>
  );
}
