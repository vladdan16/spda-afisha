import { Modal } from "./Modal";
import {
  EventCreationModalContext,
  EventEditModalContext,
} from "../contexts/EventModal";
import { DefaultForm } from "./DefaultForm";
import { ContentWindow } from "./ContentWindow";
import { useEventModal } from "../hooks/createEventModal";
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
import { IIdEventData } from "../structs/Event";

export function EventModal({
  z,
  children,
}: {
  z: number;
  children: React.ReactNode;
}) {
  const state = useEventModal();
  const show = state.close !== undefined;
  const eventType = state.event?.type;
  const eventData = state.event?.data;

  function openCreate() {
    // by default on double opening not throwing error here,
    // but returning a immediate null (aka immediate no event created)
    if (show) return Promise.resolve(null);
    return state.openCreate();
  }

  function openEdit(data: IIdEventData) {
    // by default on double opening not throwing error here,
    // but returning a immediate null (aka immediate no event created)
    if (show) return Promise.resolve(null);
    return state.openEdit(data);
  }

  return (
    <EventCreationModalContext.Provider value={{ open: openCreate }}>
      <EventEditModalContext.Provider value={{ open: openEdit }}>
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
                    <Header2Text>
                      {eventType === "create"
                        ? "Создание нового ивента"
                        : "Редактирование ивента"}
                    </Header2Text>
                    <div className="h-10" />
                    <DefaultForm onSubmit={state.submit}>
                      <div className="w-[450px]">
                        <NamedFormField
                          title="Название ивента"
                          value={eventData!.name}
                          onChange={(e) =>
                            state.update({
                              ...state.event.data,
                              name: e.target.value,
                            })
                          }
                        />
                        <NamedFormField
                          title="Место проведения"
                          value={eventData!.place || ""}
                          onChange={(e) =>
                            state.update({
                              ...state.event.data,
                              place: e.target.value,
                            })
                          }
                        />
                        <SecondaryTextWhite2>Дата и время</SecondaryTextWhite2>
                        <CustomDatePicker
                          selectedDate={eventData!.start_at}
                          onChange={(date: Date) =>
                            state.update({
                              ...state.event.data,
                              start_at: date,
                            })
                          }
                        />
                        <SecondaryTextWhite2>
                          Тип мероприятия
                        </SecondaryTextWhite2>
                        <Dropdown
                          value={type2ru.get(eventData!.type)!}
                          values={eventTypesRu}
                          onChange={(value) => {
                            state.update({
                              ...eventData!,
                              type: ru2type.get(value)!,
                            });
                          }}
                        />
                        <SecondaryTextWhite2>
                          Количество мест
                        </SecondaryTextWhite2>
                        <NumberInput
                          value={eventData!.number_seats}
                          onChange={(n) =>
                            state.update({ ...eventData!, number_seats: n })
                          }
                        />
                        <CenterW>
                          <ElevatedButton type="button" onClick={state.submit}>
                            {eventType === "create" ? "Создать" : "Сохранить"}
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
      </EventEditModalContext.Provider>
    </EventCreationModalContext.Provider>
  );
}
