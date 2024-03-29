import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FeedPage from "./pages/FeedPage";
import EntryPage from "./pages/EntryPage";

export default function App() {
  // TODO:
  // if not logged in:
  //   - force redirect to /entry
  // if logged in:
  //   - allow /feed /dashboard
  //   - disallow /entry
  //   - 404 or disallowed /entry - redirect to /feed
  return (
    <Routes>
      <Route path="/entry" element={<EntryPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}
