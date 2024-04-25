import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ErrorModal } from "./components/ErrorModal";

import * as Entry from "./pages/EntryPage";
import * as Feed from "./pages/FeedPage";
import * as Onboard from "./pages/OnboardPage";
import * as MyEnrollmentsDashboard from "./pages/dashboard/MyEnrollments";
import * as MyEventsDashboard from "./pages/dashboard/MyEvents";

import { InjectAfisha } from "./components/AfishaInjector";
import { RestAfisha, MockAfisha } from "./services/Afisha";
import { afishaApi } from "./config";
import { FirebaseAuthPersonalAfisha } from "./services/PersonalAfisha";
import { EventCreationModal } from "./components/EventCreationModal";

const rawAfisha =
  afishaApi === "mock" ? new MockAfisha() : new RestAfisha(afishaApi);
const personalAfisha = new FirebaseAuthPersonalAfisha(rawAfisha);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <InjectAfisha rawApi={rawAfisha} personal={personalAfisha}>
      <ErrorModal z={50}>
        <EventCreationModal z={40}>
          <Routes>
            <Route path={Entry.path} element={<Entry.Page />} />
            <Route
              path={MyEnrollmentsDashboard.path}
              element={<MyEnrollmentsDashboard.Page />}
            />
            <Route
              path={MyEventsDashboard.path}
              element={<MyEventsDashboard.Page />}
            />
            <Route path={Feed.path} element={<Feed.Page />} />
            <Route path={Onboard.path} element={<Onboard.Page />} />
            <Route path="*" element={<Navigate to={Feed.path} replace />} />
          </Routes>
        </EventCreationModal>
      </ErrorModal>
    </InjectAfisha>
  </BrowserRouter>
);
