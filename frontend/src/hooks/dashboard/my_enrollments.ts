import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../../contexts/Afisha";
import { IEvent } from "../../structs/Event";
import { ErrorModalContext } from "../../contexts/ErrorModal";
import { NotOnboarded } from "../../exceptions/afisha";
import { CannotObtainAccessToken } from "../../exceptions/authentication";

export function useMyEnrollmentsDashboard() {
  const errorModal = useContext(ErrorModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    IEvent[] | undefined | NotOnboarded | CannotObtainAccessToken
  >(undefined); // EnrolledEvent[] = complete | undefined = loading | Error = error

  useEffect(() => {
    _fetchEvents();
  }, []);

  async function _fetchEvents() {
    try {
      const enrollments = await personal.getMyEnrollments();
      _setState(enrollments);
    } catch (e: any) {
      if (e instanceof NotOnboarded || e instanceof CannotObtainAccessToken) {
        _setState(e);
      }
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function unenroll(event_id: number) {
    if (!Array.isArray(state)) {
      return;
    }

    try {
      await personal.unenroll(event_id);
      _setState(state.filter((e) => e.id !== event_id));
    } catch (e: any) {
      console.error("Enrollment toggling error: ", e);
      errorModal.open(e.message);
    }
  }

  if (!Array.isArray(state)) {
    return state;
  }

  return { events: state, unenroll };
}
