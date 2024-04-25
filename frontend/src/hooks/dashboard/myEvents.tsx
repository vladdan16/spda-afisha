import { useContext, useEffect, useState } from "react";
import { AfishaContext } from "../../contexts/Afisha";
import { IEvent } from "../../structs/Event";
import { ErrorModalContext } from "../../contexts/ErrorModal";
import { NotOnboarded } from "../../exceptions/afisha";
import { CannotObtainAccessToken } from "../../exceptions/authentication";
import { EventCreationModalContext } from "../../contexts/EventCreationModal";

export function useMyEventsDashboard() {
  const errorModal = useContext(ErrorModalContext)!;
  const eventCreationModal = useContext(EventCreationModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, _setState] = useState<
    IEvent[] | undefined | NotOnboarded | CannotObtainAccessToken
  >(undefined); // IEvent[] = complete | undefined = loading | Error = error

  useEffect(() => {
    _fetchEvents();
  }, []);

  async function _fetchEvents() {
    try {
      const events = await personal.getMyEvents();
      _setState(events);
    } catch (e: any) {
      if (e instanceof NotOnboarded || e instanceof CannotObtainAccessToken) {
        _setState(e);
      }
      console.error(e);
      errorModal.open(e.message);
    }
  }

  async function createEvent() {
    if (!Array.isArray(state)) {
      return;
    }

    const newEvent = await eventCreationModal.open();
    if (newEvent === null) return;
    _setState([...state, newEvent]);
  }

  async function deleteEvent(event_id: number) {
    if (!Array.isArray(state)) {
      return;
    }

    try {
      await personal.deleteEvent(event_id);
      _setState(state.filter((e) => e.id !== event_id));
    } catch (e: any) {
      console.error(e);
      errorModal.open(e.message);
    }
  }

  if (!Array.isArray(state)) {
    return state;
  }

  return { events: state, createEvent, deleteEvent };
}
