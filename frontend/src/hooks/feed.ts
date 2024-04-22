import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../contexts/Afisha";
import { EnrolledEvent, IEvent } from "../structs/Event";
import { ErrorModalContext } from "../contexts/ErrorModal";

export function useFeed() {
  const errorModal = useContext(ErrorModalContext)!;
  const afisha = useContext(AfishaContext)!;

  const [state, _setState] = useState<EnrolledEvent[] | undefined | Error>(
    undefined
  ); // EnrolledEvent[] = complete | undefined = loading | Error = error

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
    try {
      _setState(undefined);

      const events = await afisha.personal.getMyEnrollments();
      _enrollmentsIds = events.map((e) => e.id);
      _rawEvents = await afisha.rawApi.getEventsList();

      _syncEventsProjection();
    } catch (e: any) {
      console.error("Fetching error: ", e);
      _setState(Error(e.message));
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

  return { state, toggleEventEnrollment };
}
