import { DashboardLayout } from "../components/DashboardLayout";
import { _ensureUserOnboarded } from "../components/LoginState";
import { MyEnrollmentsDashboard } from "../components/MyEnrollmentsDashboard";
import { MyEventsDashboard } from "../components/MyEventsDashboard";
import { useDashboard } from "../hooks/dashboard";
import { IEvent } from "../structs/Event";

export const path = "/dashboard";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useDashboard,
    render: _render,
  });
}

function _render(
  state:
    | {
        chosen: "events";
        createdEvents: IEvent[];
        editEvent: (eventId: number) => void;
        showEventParticipants: (eventId: number) => void;
        createEvent: () => Promise<void>;
        deleteEvent: (event_id: number) => Promise<void>;
        choose: (chosen: "enrollments" | "events") => void;
      }
    | {
        chosen: "enrollments";
        enrollments: IEvent[];
        unenroll: (event_id: number) => Promise<void>;
        choose: (chosen: "enrollments" | "events") => void;
      }
) {
  return (
    <DashboardLayout current={state.chosen} choose={state.choose}>
      {state.chosen === "events" ? (
        <MyEventsDashboard
          events={state.createdEvents}
          createEvent={state.createEvent}
          deleteEvent={state.deleteEvent}
          showEventParticipants={state.showEventParticipants}
          editEvent={state.editEvent}
        />
      ) : (
        <MyEnrollmentsDashboard
          events={state.enrollments}
          unenroll={state.unenroll}
        />
      )}
    </DashboardLayout>
  );
}
