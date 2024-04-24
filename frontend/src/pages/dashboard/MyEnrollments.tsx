import { DashboardLayout } from "../../components/DashboardLayout";
import { _ensureUserOnboarded } from "../../components/LoginState";
import { GeneralPoster } from "../../components/Poster";
import { useMyEnrollmentsDashboard } from "../../hooks/dashboard/my_enrollments";
import { IEvent } from "../../structs/Event";

export const path = "/dashboard/my_enrollments";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useMyEnrollmentsDashboard,
    render: _render,
  });
}

function _render({
  events,
  unenroll,
}: {
  events: IEvent[];
  unenroll: (event_id: number) => Promise<void>;
}) {
  return (
    <DashboardLayout current="enrollments">
      <div className="flex flex-row items-center">
        {events.map((event) => (
          <GeneralPoster
            title={event.name}
            time={event.start_at}
            del={() => unenroll(event.id)}
            place={event.place}
            key={event.id}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
