import { useFeed } from "../hooks/feed";
import { splitEventsByCategories, type2ru } from "../utils/event";
import { Poster } from "../components/Poster";
import { DefaultLayout } from "../components/DefaultLayout";
import { SecondaryTextBlack } from "../components/SecondaryText";
import { PrimaryTextBlack } from "../components/PrimaryText";
import { EnrolledEvent } from "../structs/Event";
import { _ensureUserOnboarded } from "../components/LoginState";

export const path = "/feed";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useFeed,
    render: _render,
  });
}

function _render({
  state,
  toggleEventEnrollment,
}: {
  state: EnrolledEvent[];
  toggleEventEnrollment: (event_id: number) => Promise<void>;
}) {
  const categories = splitEventsByCategories(state);

  return (
    <DefaultLayout loggedIn={true}>
      <div className="h-[100px] flex justify-between px-20 bg-white items-center">
        <PrimaryTextBlack>Ивенты Иннополиса</PrimaryTextBlack>
      </div>
      <div className="flex flex-col px-20">
        {Object.keys(categories).map((category) => (
          <div className="py-10" key={category}>
            <SecondaryTextBlack>{type2ru.get(category)}</SecondaryTextBlack>
            <div key={category} className="flex flex-row items-center">
              {categories[category].map((event) => (
                <Poster
                  title={event.name}
                  time={event.start_at}
                  avaliable_seats={event.available_seats}
                  number_seats={event.number_seats}
                  isEnrolled={event.isEnrolled}
                  toggle={() => toggleEventEnrollment(event.id)}
                  key={event.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
