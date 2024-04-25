import { Modal } from "./Modal";
import { EventCreationModalContext } from "../contexts/EventCreationModal";
import { DefaultForm } from "./DefaultForm";
import { ContentWindow } from "./ContentWindow";
import { useCreateEventModal } from "../hooks/createEventModal";
import { CenterW } from "./Center";
import { ElevatedButton } from "./ElevatedButton";
import { CrossIconButton } from "./CrossIconButton";
import { Header2Text } from "./Header2Text";
import { CenterHLoading } from "./CenterHLoading";
import { NamedFormField } from "./NamedFormField";
import { Dropdown } from "./Dropdown";
import { SecondaryTextWhite2 } from "./SecondaryText";
import { eventTypesRu, ru2type, type2ru } from "../utils/event";
import { CustomDatePicker } from "./CustomDatePicker";
import { NumberInput } from "./NumberInput";

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
              <ContentWindow w={500}>
                <div className="mx-10">
                  <div className="absolute top-0 right-0 m-4">
                    <CrossIconButton onClick={state.close} />
                  </div>
                  <Header2Text>Создание нового ивента</Header2Text>
                  <div className="h-10" />
                  <DefaultForm onSubmit={state.submit}>
                    <div className="w-[450px]">
                      <NamedFormField
                        title="Название ивента"
                        value={state.data.name}
                        onChange={(e) =>
                          state.update({ ...state.data, name: e.target.value })
                        }
                      />
                      <NamedFormField
                        title="Место проведения"
                        value={state.data.place || ""}
                        onChange={(e) =>
                          state.update({ ...state.data, place: e.target.value })
                        }
                      />
                      <SecondaryTextWhite2>Дата и время</SecondaryTextWhite2>
                      <CustomDatePicker
                        selectedDate={state.data.start_at}
                        onChange={(date: Date) =>
                          state.update({ ...state.data, start_at: date })
                        }
                      />
                      <SecondaryTextWhite2>Тип мероприятия</SecondaryTextWhite2>
                      <Dropdown
                        value={type2ru.get(state.data.type)!}
                        values={eventTypesRu}
                        onChange={(value) => {
                          state.update({
                            ...state.data,
                            type: ru2type.get(value)!,
                          });
                        }}
                      />
                      <SecondaryTextWhite2>Количество мест</SecondaryTextWhite2>
                      <NumberInput
                        value={state.data.number_seats}
                        onChange={(n) =>
                          state.update({ ...state.data, number_seats: n })
                        }
                      />
                      <CenterW>
                        <ElevatedButton type="button" onClick={state.submit}>
                          Создать
                        </ElevatedButton>
                      </CenterW>
                    </div>
                  </DefaultForm>
                </div>
              </ContentWindow>
            </div>
          )}
        </Modal>
      )}
      {children}
    </EventCreationModalContext.Provider>
  );
}
