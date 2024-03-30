import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorModalState } from "./context/ErrorModalContext";
import { ErrorModal } from "./components/ErrorModal";
import EntryPage from "./pages/EntryPage";
import FeedPage from "./pages/FeedPage";
import DashboardPage from "./pages/DashboardPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ErrorModalState>
      <ErrorModal />
      <Routes>
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </ErrorModalState>
  </BrowserRouter>
);
