import { CreateNewEventButton } from "./CreateNewEventButton";
import { GeneralPoster2 } from "./Poster";
import { IEvent } from "../structs/Event";

export function MyEventsDashboard({
  events,
  showEventParticipants,
  editEvent,
  createEvent,
  deleteEvent,
}: {
  events: IEvent[];
  showEventParticipants: (eventId: number) => void;
  editEvent: (eventId: number) => void;
  createEvent: () => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
}) {
  return (
    <>
      <CreateNewEventButton onClick={createEvent} />
      <div className="flex flex-row items-center space-x-10 my-10">
        {events.map((event) => (
          <GeneralPoster2
            title={event.name}
            time={event.start_at}
            del={() => deleteEvent(event.id)}
            edit={() => editEvent(event.id)}
            participants={() => showEventParticipants(event.id)}
            place={event.place}
            key={event.id}
          />
        ))}
      </div>
    </>
  );
}
