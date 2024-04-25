import { CreateNewEventButton } from "../../components/CreateNewEventButton";
import { DashboardLayout } from "../../components/DashboardLayout";
import { _ensureUserOnboarded } from "../../components/LoginState";
import { GeneralPoster } from "../../components/Poster";
import { useMyEventsDashboard } from "../../hooks/dashboard/myEvents";
import { IEvent } from "../../structs/Event";

export const path = "/dashboard/my/events";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useMyEventsDashboard,
    render: _render,
  });
}

function _render({
  events,
  createEvent,
  deleteEvent,
}: {
  events: IEvent[];
  createEvent: () => Promise<void>;
  deleteEvent: (event_id: number) => Promise<void>;
}) {
  return (
    <DashboardLayout current="events">
      <CreateNewEventButton onClick={createEvent} />
      <div className="flex flex-row items-center space-x-10 my-10">
        {events.map((event) => (
          <GeneralPoster
            title={event.name}
            time={event.start_at}
            del={() => deleteEvent(event.id)}
            place={event.place}
            key={event.id}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
