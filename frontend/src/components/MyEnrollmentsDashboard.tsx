import { GeneralPoster } from "./Poster";
import { IEvent } from "../structs/Event";

export function MyEnrollmentsDashboard({
  events,
  unenroll,
}: {
  events: IEvent[];
  unenroll: (event_id: number) => Promise<void>;
}) {
  return (
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
  );
}
