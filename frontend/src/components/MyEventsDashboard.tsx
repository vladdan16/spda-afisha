import { CreateNewEventButton } from "./CreateNewEventButton";
import { GeneralPoster } from "./Poster";
import { IEvent } from "../structs/Event";

export function MyEventsDashboard({
  events,
  createEvent,
  deleteEvent,
}: {
  events: IEvent[];
  createEvent: () => Promise<void>;
  deleteEvent: (event_id: number) => Promise<void>;
}) {
  return (
    <>
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
    </>
  );
}
