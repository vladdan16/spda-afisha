import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import FeedPage from "./pages/FeedPage";
import DashboardPage from "./pages/DashboardPage";
import { ErrorModal } from "./components/ErrorModal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ErrorModal>
      <Routes>
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </ErrorModal>
  </BrowserRouter>
);
