import { useContext, useEffect, useState } from "react";
import {
  EventCreationModalContext,
  EventEditModalContext,
} from "../contexts/EventModal";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { AfishaContext } from "../contexts/Afisha";
import { IEvent, IEventWithUsers } from "../structs/Event";
import { CannotObtainAccessToken } from "../exceptions/authentication";
import { NotOnboarded } from "../exceptions/afisha";
import { ParticipantsModalContext } from "../contexts/ParticipantsModal";

export function useDashboard() {
  const errorModal = useContext(ErrorModalContext)!;
  const eventCreationModal = useContext(EventCreationModalContext)!;
  const eventEditModal = useContext(EventEditModalContext)!;
  const participantsModal = useContext(ParticipantsModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    | {
        createdEvents: IEventWithUsers[];
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
        return;
      }
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function createEvent() {
    if (state instanceof Error || state === undefined) {
      return;
    }

    const rawNewEvent = await eventCreationModal.open();
    if (rawNewEvent === null) return;

    const newEvent: IEventWithUsers = {
      ...rawNewEvent,
      images: [],
      available_seats: rawNewEvent.number_seats,
      enrolled_users: [],
    };

    _setState({
      ...state,
      createdEvents: [...state.createdEvents, newEvent],
    });
  }

  async function deleteEvent(eventId: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }

    try {
      await personal.deleteEvent(eventId);
      _setState({
        ...state,
        enrollments: state.createdEvents.filter((e) => e.id !== eventId),
        createdEvents: state.createdEvents.filter((e) => e.id !== eventId),
      });
    } catch (e: any) {
      console.error(e);
      errorModal.open(e.message);
    }
  }

  function showEventParticipants(eventId: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }
    const event = state.createdEvents.find((e) => e.id === eventId)!;
    participantsModal.open(
      event.name,
      event.start_at,
      event.enrolled_users.map((u) => `${u.name} ${u.surname}`)
    );
  }

  async function editEvent(eventId: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }
    const rawInitialEvent = state.createdEvents.find(
      (event) => event.id === eventId
    )!;
    const rawEditedEvent = await eventEditModal.open(rawInitialEvent);
    const editedEvent = { ...rawInitialEvent, ...rawEditedEvent };

    _setState({
      ...state,
      createdEvents: state.createdEvents.map((e) =>
        e.id === editedEvent.id ? editedEvent : e
      ),
      enrollments: state.enrollments.map((e) =>
        e.id === editedEvent.id ? editedEvent : e
      ),
    });
  }

  async function unenroll(eventId: number) {
    if (state instanceof Error || state === undefined) {
      return;
    }

    try {
      await personal.unenroll(eventId);
      _setState({
        ...state,
        enrollments: state.enrollments.filter((e) => e.id !== eventId),
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
        showEventParticipants,
        editEvent,
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
