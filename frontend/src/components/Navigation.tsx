import { Link, useNavigate } from "react-router-dom";

import * as Entry from "../pages/EntryPage";
import * as MyEnrollmentsDashboard from "../pages/dashboard/MyEnrollments";
import * as Feed from "../pages/FeedPage";
import { signOut } from "../services/Authenticator";

export function Navigation({ loggedIn }: { loggedIn: boolean }) {
  const navigate = useNavigate();

  const exit = async () => {
    await signOut();
    navigate(Entry.path);
  };

  return (
    <nav className="flex justify-between px-20 py-4 bg-white items-center">
      <Link to={Feed.path}>
        <div className="text-blue-800 text-[40px] font-black font-Montserrat">
          Aфиша
        </div>
      </Link>
      {loggedIn && (
        <div className="flex items-center">
          <Link to={MyEnrollmentsDashboard.path} className="mr-8">
            <div className="text-black text-[32px] font-bold font-Montserrat">
              Мои ивенты
            </div>
          </Link>
          <button
            className="text-black text-[32px] font-semibold font-Montserrat"
            onClick={exit}
          >
            выйти
          </button>
        </div>
      )}
    </nav>
  );
}
