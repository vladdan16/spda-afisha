import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FeedPage from "./pages/FeedPage";
import EntryPage from "./pages/EntryPage";

export default function App() {
  // TODO:
  // /dashboard - if not logged in - redirect to /entry (ensureLoggedIn)
  // /feed - if not logged in - redirect to /entry (ensureLoggedIn)
  // /entry - if logged in - redirect to /feed (ensureNotLoggedIn)
  // 404 - if not logged in - redirect to /entry, else redirect to /feed
  return (
    <Routes>
      <Route path="/entry" element={<EntryPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}
