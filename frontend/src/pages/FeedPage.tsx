import { ensureUserLoggedIn } from "../shared/loginState";
import * as Entry from "../pages/EntryPage";
import { useFeed } from "../hooks/feed";
import { splitEventsByCategories, type2ru } from "../utils/event";
import { ErrorMsg } from "../components/ErrorMsg";
import { Poster } from "../components/Poster";
import { CenterHLoading } from "../components/CenterHLoading";
import { DefaultLayout } from "../components/DefaultLayout";
import { SecondaryTextBlack } from "../components/SecondaryText";
import { PrimaryTextBlack } from "../components/PrimaryText";

export const path = "/feed";

export function Page() {
  const { state, toggleEventEnrollment } = useFeed();

  return ensureUserLoggedIn({
    redirect: Entry.path,
    render: () => {
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
                  <SecondaryTextBlack>
                    {type2ru.get(category)}
                  </SecondaryTextBlack>
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
    },
  });
}
