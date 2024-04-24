import { _ensureUserOnboarded } from "../../components/LoginState";
import { PageLayout } from "../../components/PageLayout";
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
    <PageLayout title={"Мои Ивенты"}>
      <div className="flex flex-row items-center">
        {events.map((event) => (
          <GeneralPoster
            title={event.name}
            time={event.start_at}
            avaliable_seats={event.available_seats}
            number_seats={event.number_seats}
            del={() => unenroll(event.id)}
            key={event.id}
          />
        ))}
      </div>
    </PageLayout>
  );
}
