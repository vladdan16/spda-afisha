import { Navigation } from "../components/Navigation";
import { ensureUserLoggedIn } from "../shared/loginState";
import * as Entry from "../pages/EntryPage";
import { useFeed } from "../hooks/feed";
import { splitEventsByCategories, type2ru } from "../utils/event";
import { ErrorMsg } from "../components/ErrorMsg";
import { Loading } from "../components/Loading";
import { Poster } from "../components/Poster";

export const path = "/feed";

export function Page() {
  const { state, toggleEventEnrollment } = useFeed();

  return ensureUserLoggedIn({
    redirect: Entry.path,
    render: () => {
      let body;

      if (state === undefined) {
        body = (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        );
      } else if (state instanceof Error) {
        body = <ErrorMsg msg={state.message} />;
      } else {
        const categories = splitEventsByCategories(state);
        body = (
          <>
            <div className="h-[100px] flex justify-between px-20 bg-white items-center">
              <div className="text-black text-[54px] font-bold font-Montserrat">
                Ивенты Иннополиса
              </div>
            </div>
            <div className="flex flex-col px-20">
              {Object.keys(categories).map((category) => (
                <div className="py-10">
                  <div className="text-black text-[48px] font-bold font-Montserrat py-4">
                    {type2ru.get(category)}
                  </div>
                  <div key={category} className="flex flex-row items-center">
                    <div className="flex flex-row">
                      {categories[category].map((event) => (
                        <Poster
                          title={event.name}
                          subtitle={`${event.start_at.toLocaleString()}, ${
                            event.description
                          }`}
                          isEnrolled={event.isEnrolled}
                          toggle={() => toggleEventEnrollment(event.id)}
                          key={event.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      }

      return (
        <>
          <Navigation loggedIn={true} />
          {body}
        </>
      );
    },
  });
}
