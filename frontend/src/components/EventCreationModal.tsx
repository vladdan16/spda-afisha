import { Modal } from "./Modal";
import { EventCreationModalContext } from "../contexts/EventCreationModal";
import { DefaultForm } from "./DefaultForm";
import { ContentWindow } from "./ContentWindow";
import { useCreateEventModal } from "../hooks/createEventModal";

export function EventCreationModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useCreateEventModal();
  const show = state.open === undefined;

  function open() {
    // by default on double opening not throwing error here,
    // but returning a immediate null (aka immediate no event created)
    if (show) return Promise.resolve(null);
    return state.open();
  }

  return (
    <EventCreationModalContext.Provider value={{ open }}>
      {show && (
        <Modal onClose={state.close}>
          <ContentWindow>
            <DefaultForm onSubmit={state.submit}>
              <></>
            </DefaultForm>
          </ContentWindow>
        </Modal>
      )}
      {children}
    </EventCreationModalContext.Provider>
  );
}
