import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ErrorModal } from "./components/ErrorModal";

import * as Entry from "./pages/EntryPage";
import * as MyEnrollmentsDashboard from "./pages/dashboard/MyEnrollments";
import * as Feed from "./pages/FeedPage";
import * as Onboard from "./pages/OnboardPage";

import { InjectAfisha } from "./components/AfishaInjector";
import { RestAfisha, MockAfisha } from "./services/Afisha";
import { afishaApi } from "./config";
import { FirebaseAuthPersonalAfisha } from "./services/PersonalAfisha";

const rawAfisha =
  afishaApi === "mock" ? new MockAfisha() : new RestAfisha(afishaApi);
const personalAfisha = new FirebaseAuthPersonalAfisha(rawAfisha);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <InjectAfisha rawApi={rawAfisha} personal={personalAfisha}>
      <ErrorModal>
        <Routes>
          <Route path={Entry.path} element={<Entry.Page />} />
          <Route
            path={MyEnrollmentsDashboard.path}
            element={<MyEnrollmentsDashboard.Page />}
          />
          <Route path={Feed.path} element={<Feed.Page />} />
          <Route path={Onboard.path} element={<Onboard.Page />} />
          <Route path="*" element={<Navigate to={Feed.path} replace />} />
        </Routes>
      </ErrorModal>
    </InjectAfisha>
  </BrowserRouter>
);
