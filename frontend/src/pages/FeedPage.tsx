import { useFeed } from "../hooks/feed";
import { splitEventsByCategories, type2ru } from "../utils/event";
import { ErrorMsg } from "../components/ErrorMsg";
import { Poster } from "../components/Poster";
import { CenterHLoading } from "../components/CenterHLoading";
import { DefaultLayout } from "../components/DefaultLayout";
import { SecondaryTextBlack } from "../components/SecondaryText";
import { PrimaryTextBlack } from "../components/PrimaryText";
import { useOnboardingCheck_Via_MyEnrollments } from "../hooks/authentication";
import { IEvent } from "../structs/Event";
import { _ensureUserOnboarded } from "../shared/loginState";

export const path = "/feed";

export function Page() {
  return _ensureUserOnboarded({
    useDataFetch: useOnboardingCheck_Via_MyEnrollments,
    render: _render,
  });
}

function _render(myEnrollments: IEvent[]) {
  const { state, toggleEventEnrollment } = useFeed(myEnrollments);

  let body;

  if (state === undefined) {
    body = <CenterHLoading />;
  } else if (state instanceof Error) {
    body = <ErrorMsg msg={state.message} />;
  } else {
    const categories = splitEventsByCategories(state);
    body = (
      <>
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
                    isEnrolled={event.isEnrolled}
                    toggle={() => toggleEventEnrollment(event.id)}
                    key={event.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return <DefaultLayout loggedIn={true}>{body}</DefaultLayout>;
}
