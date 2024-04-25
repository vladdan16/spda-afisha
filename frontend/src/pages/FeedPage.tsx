import { useFeed } from "../hooks/feed";
import { splitEventsByCategories, type2ru } from "../utils/event";
import { EnrollPoster } from "../components/Poster";
import { SecondaryTextBlack } from "../components/SecondaryText";
import { EnrolledEvent } from "../structs/Event";
import { _ensureUserOnboarded } from "../components/LoginState";
import { PageLayout } from "../components/PageLayout";

export const path = "/feed";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useFeed,
    render: _render,
  });
}

function _render({
  events,
  toggleEventEnrollment,
}: {
  events: EnrolledEvent[];
  toggleEventEnrollment: (event_id: number) => Promise<void>;
}) {
  const categories = splitEventsByCategories(events);

  return (
    <PageLayout title={"Ивенты Иннополиса"}>
      <div className="flex flex-col">
        {Array.from(categories.keys()).map((category) => (
          <div className="py-5" key={category}>
            <SecondaryTextBlack>{type2ru.get(category)}</SecondaryTextBlack>
            <div className="flex flex-row items-center">
              {categories.get(category)!.map((event) => (
                <EnrollPoster
                  title={event.name}
                  time={event.start_at}
                  avaliable_seats={event.available_seats}
                  number_seats={event.number_seats}
                  place={event.place}
                  isEnrolled={event.isEnrolled}
                  toggle={() => toggleEventEnrollment(event.id)}
                  key={event.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
