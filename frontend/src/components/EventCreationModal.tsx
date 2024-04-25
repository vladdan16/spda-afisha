import { Modal } from "./Modal";
import { EventCreationModalContext } from "../contexts/EventCreationModal";
import { DefaultForm } from "./DefaultForm";
import { ContentWindow } from "./ContentWindow";
import { useCreateEventModal } from "../hooks/createEventModal";
import { InputField } from "./InputField";
import { CenterW } from "./Center";
import { ElevatedButton } from "./ElevatedButton";
import { CrossIconButton } from "./CrossIconButton";
import { Header2Text } from "./Header2Text";
import { CenterHLoading } from "./CenterHLoading";

export function EventCreationModal({
  z,
  children,
}: {
  z: number;
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
        <Modal onClose={undefined} z={z}>
          {state.loading ? (
            <CenterHLoading />
          ) : (
            <div className="relative">
              <ContentWindow>
                <div className="absolute top-0 right-0 m-4">
                  <CrossIconButton onClick={state.close} />
                </div>
                <Header2Text>Создание нового ивента</Header2Text>
                <div className="h-10" />
                <DefaultForm onSubmit={state.submit}>
                  <InputField
                    type="text"
                    placeholder="Название ивента"
                    value={state.data.name}
                    onChange={(e) =>
                      state.update({ ...state.data, name: e.target.value })
                    }
                  />
                  <CenterW>
                    <ElevatedButton type="button" onClick={state.submit}>
                      Сохранить
                    </ElevatedButton>
                  </CenterW>
                </DefaultForm>
              </ContentWindow>
            </div>
          )}
        </Modal>
      )}
      {children}
    </EventCreationModalContext.Provider>
  );
}
