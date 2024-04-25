import { DashboardLayout } from "../../components/DashboardLayout";
import { _ensureUserOnboarded } from "../../components/LoginState";
import { GeneralPoster } from "../../components/Poster";
import { useMyEnrollmentsDashboard } from "../../hooks/dashboard/myEnrollments";
import { IEvent } from "../../structs/Event";

export const path = "/dashboard/my/enrollments";

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
      <div className="flex flex-row items-center space-x-10 mb-10">
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
