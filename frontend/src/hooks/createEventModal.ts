import { useContext, useState } from "react";
import { IEventData, IIdEventData } from "../structs/Event";
import { AfishaContext } from "../contexts/Afisha";
import { ErrorModalContext } from "../contexts/ErrorModal";

export function useEventModal() {
  const errorModal = useContext(ErrorModalContext)!;
  const { personal } = useContext(AfishaContext)!;

  const [state, setState] = useState<{
    event:
      | {
          type: "edit";
          data: IIdEventData;
        }
      | {
          type: "create";
          data: IEventData;
        };
    resolve: (res: IIdEventData | null) => void;
    loading: boolean;
  } | null>(null);

  function _complete(value: IIdEventData | null) {
    if (state === null)
      throw new Error("Trying to complete event modal when it is already open");
    state.resolve(value);
    setState(null);
  }

  function openCreate() {
    if (state !== null)
      throw new Error("Trying to open event modal when it is already open");
    return new Promise<IIdEventData | null>((resolve) => {
      console.assert(state === null);
      setState({
        event: {
          type: "create",
          data: {
            name: "",
            description: "",
            start_at: new Date(),
            type: "OTHER",
            number_seats: 10,
            place: null,
          },
        },
        resolve: resolve,
        loading: false,
      });
    });
  }

  function openEdit(data: IIdEventData) {
    if (state !== null)
      throw new Error("Trying to open event modal when it is already open");
    return new Promise<IIdEventData | null>((resolve) => {
      console.assert(state === null);
      setState({
        event: {
          type: "edit",
          data: data,
        },
        resolve: resolve,
        loading: false,
      });
    });
  }

  function close() {
    if (state === null)
      throw new Error("Trying to close event modal when it is already closed");
    if (state.loading) return;
    _complete(null);
  }

  async function submit() {
    if (state === null)
      throw new Error("Trying to submit on event modal when it is closed");
    if (state.loading) return;
    setState({ ...state, loading: true });
    try {
      if (state.event.type === "create") {
        const { id } = await personal.createEvent(state.event.data);
        _complete({
          ...state.event.data,
          id: id,
        });
      } else {
        await personal.editEvent(state.event.data);
        _complete(state.event.data);
      }
    } catch (e: any) {
      console.error(e);
      errorModal.open(e.message);
      setState({ ...state, loading: false });
    }
  }

  function update(data: IEventData) {
    if (state === null)
      throw new Error("Trying to update event modal when it is closed");
    if (state.loading) return;
    if (state.event.type === "create") {
      setState({
        ...state,
        event: { ...state.event, data: data },
      });
    } else {
      setState({
        ...state,
        event: { ...state.event, data: { id: state.event.data.id, ...data } },
      });
    }
  }

  return state === null
    ? { openCreate, openEdit }
    : {
        event: state.event,
        loading: state.loading,
        update,
        close,
        submit,
      };
}
