import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../contexts/Afisha";
import { ensureToken } from "../services/TokenStore";
import { EnrolledEvent, IEvent } from "../structs/Event";
import { ErrorModalContext } from "../contexts/ErrorModal";

export function useFeed() {
  const errorModal = useContext(ErrorModalContext)!;
  const afisha = useContext(AfishaContext)!;

  const [state, _setState] = useState<EnrolledEvent[] | undefined | Error>(
    undefined
  ); // EnrolledEvent[] = complete | undefined = loading | Error = error

  useEffect(() => {
    _fetchEvents();
  }, []);

  let _enrollmentsIds: number[] = [];
  let _rawEvents: IEvent[] = [];

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

      const accessToken = ensureToken();

      const events = await afisha.getEventsList(accessToken);
      _enrollmentsIds = events.map((e) => e.id);
      _rawEvents = await afisha.getEventsList(accessToken);

      _syncEventsProjection();
    } catch (e: any) {
      console.error("Fetching error: ", e);
      _setState(Error(e.message));
    }
  }

  async function toggleEventEnrollment(event_id: number) {
    try {
      const accessToken = ensureToken();

      const wasEnrolled = _enrollmentsIds.includes(event_id);

      const switchEnrollment = wasEnrolled ? afisha.unenroll : afisha.enroll;
      await switchEnrollment(accessToken, event_id);

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
