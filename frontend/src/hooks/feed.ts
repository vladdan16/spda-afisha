import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../contexts/Afisha";
import { getToken } from "../services/TokenStore";
import { EnrolledEvent, IEvent } from "../structs/Event";
import { ErrorModalContext } from "../contexts/ErrorModal";

export function useFeed() {
  const errorModal = useContext(ErrorModalContext)!;
  const afisha = useContext(AfishaContext)!;
  const accessToken = getToken()!;

  const [state, _setState] = useState<EnrolledEvent[] | undefined | Error>(
    undefined
  ); // EnrolledEvent[] = complete | undefined = loading | Error = error

  let _ennrollmentsIds: number[] = [];
  let _rawEvents: IEvent[] = [];

  function _syncEventsProjection() {
    _setState(
      _rawEvents.map(
        (e) =>
          new EnrolledEvent({
            event: e,
            isEnrolled: _ennrollmentsIds.includes(e.id),
          })
      )
    );
  }

  async function _fetchEvents() {
    try {
      _setState(undefined);

      _ennrollmentsIds = (await afisha.getMyEnrollments(accessToken)).map(
        (e) => e.id
      );
      _rawEvents = await afisha.getEventsList(accessToken);

      _syncEventsProjection();
    } catch (e: any) {
      console.error("Authentication error: ", e);
      _setState(Error(e.message));
    }
  }

  async function toggleEventEnrollment(event_id: number) {
    try {
      const wasEnrolled = _ennrollmentsIds.includes(event_id);

      const switchEnrollment = wasEnrolled ? afisha.unenroll : afisha.enroll;
      await switchEnrollment(accessToken, event_id);

      if (wasEnrolled) {
        _ennrollmentsIds = _ennrollmentsIds.filter((id) => id !== event_id);
      } else {
        _ennrollmentsIds.push(event_id);
      }

      _syncEventsProjection();
    } catch (e: any) {
      console.error("Enrollment toggling error: ", e);
      errorModal.open(e.message);
    }
  }

  useEffect(() => {
    _fetchEvents();
  }, []);

  return { state, toggleEventEnrollment };
}
