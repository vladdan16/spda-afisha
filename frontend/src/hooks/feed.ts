import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../contexts/Afisha";
import { EnrolledEvent, IEvent } from "../structs/Event";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { NotOnboarded } from "../exceptions/afisha";
import { CannotObtainAccessToken } from "../exceptions/authentication";

export function useFeed() {
  const errorModal = useContext(ErrorModalContext)!;
  const afisha = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    EnrolledEvent[] | undefined | NotOnboarded | CannotObtainAccessToken
  >(undefined); // EnrolledEvent[] = complete | undefined = loading | Error = error

  let _enrollmentsIds: number[] = [];
  let _rawEvents: IEvent[] = [];

  useEffect(() => {
    _fetchEvents();
  }, []);

  function _syncEventsProjection() {
    _setState(
      _rawEvents.map(
        (e) =>
          new EnrolledEvent({
            event: e,
            isEnrolled: _enrollmentsIds.includes(e.id),
          })
      )
    );
  }

  async function _fetchEvents() {
    while (true) {
      try {
        const enrollments = await afisha.personal.getMyEnrollments();
        _enrollmentsIds = enrollments.map((e) => e.id);
        _rawEvents = await afisha.rawApi.getEventsList();
        _syncEventsProjection();
        break;
      } catch (e: any) {
        if (e instanceof NotOnboarded || e instanceof CannotObtainAccessToken) {
          _setState(e);
        }
        console.error(e);
        console.log("Retrying in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async function toggleEventEnrollment(event_id: number) {
    try {
      const wasEnrolled = _enrollmentsIds.includes(event_id);

      const personal = afisha.personal;
      const switchEnrollment = wasEnrolled
        ? personal.unenroll.bind(personal)
        : personal.enroll.bind(personal);
      await switchEnrollment(event_id);

      if (wasEnrolled) {
        _enrollmentsIds = _enrollmentsIds.filter((id) => id !== event_id);
      } else {
        _enrollmentsIds.push(event_id);
      }

      _syncEventsProjection();
    } catch (e: any) {
      console.error("Enrollment toggling error: ", e);
      errorModal.open(e.message);
    }
  }

  if (state instanceof NotOnboarded) {
    return state;
  }

  if (state instanceof CannotObtainAccessToken) {
    return state;
  }

  if (state === undefined) {
    return state;
  }

  return { state, toggleEventEnrollment };
}
