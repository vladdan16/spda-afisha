import { useContext, useEffect, useState } from "react";
import { EventCreationModalContext } from "../contexts/EventCreationModal";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { AfishaContext } from "../contexts/Afisha";
import { IEvent } from "../structs/Event";
import { CannotObtainAccessToken } from "../exceptions/authentication";
import { NotOnboarded } from "../exceptions/afisha";

export function useDashboard() {
  const errorModal = useContext(ErrorModalContext)!;
  const eventCreationModal = useContext(EventCreationModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    | {
        createdEvents: IEvent[];
        enrollments: IEvent[];
        chosen: "enrollments" | "events";
      }
    | undefined
    | NotOnboarded
    | CannotObtainAccessToken
  >(undefined); // IEvent[] = complete | undefined = loading | Error = error

  useEffect(() => {
    _fetchEvents();
  }, []);

  async function _fetchEvents() {
    try {
      const createdEvents = await personal.getMyEvents();
      const enrollments = await personal.getMyEnrollments();
      _setState({ createdEvents, enrollments, chosen: "enrollments" });
    } catch (e: any) {
      if (e instanceof NotOnboarded || e instanceof CannotObtainAccessToken) {
        _setState(e);
      }
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function createEvent() {
    if (state instanceof Error || state === undefined) {
      return;
    }

    const newEvent = await eventCreationModal.open();
    if (newEvent === null) return;
    _setState({
      ...state,
      createdEvents: [...state.createdEvents, newEvent],
    });
  }

  async function deleteEvent(event_id: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }

    try {
      await personal.deleteEvent(event_id);
      _setState({
        ...state,
        createdEvents: state.createdEvents.filter((e) => e.id !== event_id),
      });
    } catch (e: any) {
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function unenroll(event_id: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }

    try {
      await personal.unenroll(event_id);
      _setState({
        ...state,
        enrollments: state.enrollments.filter((e) => e.id !== event_id),
      });
    } catch (e: any) {
      console.error("Enrollment toggling error: ", e);
      errorModal.open(e.message);
    }
  }

  function choose(chosen: "enrollments" | "events") {
    if (state instanceof Error || state === undefined) {
      return;
    }
    _setState({ ...state, chosen });
  }

  if (state instanceof Error || state === undefined) {
    return state;
  }

  return state.chosen === "events"
    ? {
        createdEvents: state.createdEvents,
        createEvent,
        deleteEvent,
        chosen: state.chosen,
        choose,
      }
    : {
        enrollments: state.enrollments,
        unenroll,
        chosen: state.chosen,
        choose,
      };
}
