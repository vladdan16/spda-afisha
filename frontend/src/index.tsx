import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorModal } from "./components/ErrorModal";

import * as Entry from "./pages/EntryPage";
import * as Dashboard from "./pages/DashboardPage";
import * as Feed from "./pages/FeedPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ErrorModal>
      <Routes>
        <Route path={Entry.path} element={<Entry.Page />} />
        <Route path={Dashboard.path} element={<Dashboard.Page />} />
        <Route path={Feed.path} element={<Feed.Page />} />
      </Routes>
    </ErrorModal>
  </BrowserRouter>
);
