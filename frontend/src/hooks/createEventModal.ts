import { useContext, useState } from "react";
import { IEvent, IEventData } from "../structs/Event";
import { AfishaContext } from "../contexts/Afisha";
import { ErrorModalContext } from "../contexts/ErrorModal";

export function useCreateEventModal() {
  const errorModal = useContext(ErrorModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, setState] = useState<{
    data: IEventData;
    loading: boolean;
    complete: (res: IEvent | null) => void;
  } | null>(null);

  function open() {
    if (state !== null)
      throw new Error(
        "Trying to open event creation modal when it is already open"
      );
    return new Promise<IEvent | null>((resolve) => {
      console.assert(state === null);
      setState({
        data: {
          name: "",
          description: "",
          start_at: new Date(),
          type: "OTHER",
          number_seats: 10,
          place: null,
        },
        loading: false,
        complete: (value) => {
          resolve(value);
          setState(null);
        },
      });
    });
  }

  function close() {
    if (state === null)
      throw new Error(
        "Trying to close event creation modal when it is already closed"
      );
    if (state.loading) return;
    state.complete(null);
  }

  async function submit() {
    if (state === null)
      throw new Error(
        "Trying to submit on event creation modal when it is closed"
      );
    if (state.loading) return;
    setState({ ...state, loading: true });
    try {
      const { id } = await personal.createEvent(state.data);
      state.complete({
        ...state.data,
        id: id,
        available_seats: state.data.number_seats,
        images: [],
      }); // sets state to null
    } catch (e: any) {
      console.error(e);
      errorModal.open(e.message);
      setState({ ...state, loading: false });
    }
  }

  function update(data: IEventData) {
    if (state === null)
      throw new Error(
        "Trying to update event creation modal when it is closed"
      );
    if (state.loading) return;
    setState({ ...state, data });
  }

  return state === null
    ? { open }
    : {
        data: state.data,
        loading: state.loading,
        update,
        close,
        submit,
      };
}
