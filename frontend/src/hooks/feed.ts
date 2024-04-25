import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../contexts/Afisha";
import { EnrolledEvent } from "../structs/Event";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { NotOnboarded } from "../exceptions/afisha";
import { CannotObtainAccessToken } from "../exceptions/authentication";

export function useFeed() {
  const errorModal = useContext(ErrorModalContext)!;
  const afisha = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    EnrolledEvent[] | undefined | NotOnboarded | CannotObtainAccessToken
  >(undefined); // EnrolledEvent[] = complete | undefined = loading | Error = error

  useEffect(() => {
    _fetchEvents();
  }, []);

  async function _fetchEvents() {
    try {
      const enrollments = await afisha.personal.getMyEnrollments();
      const _enrollmentsIds = enrollments.map((e) => e.id);
      const _rawEvents = await afisha.rawApi.getEventsList();
      _setState(
        _rawEvents.map(
          (e) =>
            new EnrolledEvent({
              event: e,
              isEnrolled: _enrollmentsIds.includes(e.id),
            })
        )
      );
    } catch (e: any) {
      if (e instanceof NotOnboarded || e instanceof CannotObtainAccessToken) {
        _setState(e);
        return;
      }
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function toggleEventEnrollment(event_id: number) {
    if (!Array.isArray(state)) {
      return;
    }

    try {
      const event = state.find((e) => e.id === event_id)!;
      const wasEnrolled = event.isEnrolled;

      const personal = afisha.personal;
      const switchEnrollment = wasEnrolled
        ? personal.unenroll.bind(personal)
        : personal.enroll.bind(personal);
      await switchEnrollment(event_id);

      event.isEnrolled = !wasEnrolled;
      event.available_seats += wasEnrolled ? 1 : -1;
      _setState([...state]);
    } catch (e: any) {
      console.error("Enrollment toggling error: ", e);
      errorModal.open(e.message);
    }
  }

  if (!Array.isArray(state)) {
    return state;
  }

  return { events: state, toggleEventEnrollment };
}
