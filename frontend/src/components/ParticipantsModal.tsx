import { Modal } from "./Modal";
import { ContentWindow } from "./ContentWindow";
import { CrossIconButton } from "./CrossIconButton";
import { ParticipantsModalContext } from "../contexts/ParticipantsModal";
import { useParticipantsModal } from "../hooks/participantsModal";
import { Header2Text } from "./Header2Text";
import { SecondaryTextWhite2 } from "./SecondaryText";
import { StringList } from "./StringList";

export function ParticipantsModal({
  z,
  children,
}: {
  z: number;
  children: React.ReactNode;
}) {
  const { state, open, close } = useParticipantsModal();
  const show = state !== null;

  return (
    <ParticipantsModalContext.Provider value={{ open }}>
      {show && (
        <Modal onClose={undefined} z={z}>
          <div className="relative">
            <ContentWindow w={500}>
              <div className="mx-10 flex flex-col items-center">
                <Header2Text>Участники мероприятия</Header2Text>
                <div className="absolute top-0 right-0 m-4">
                  <CrossIconButton onClick={close} />
                </div>
                <div className="mt-5 mb-6">
                  <SecondaryTextWhite2>{state.title}</SecondaryTextWhite2>
                </div>
                <StringList maxHeight={400} strings={state.participants} />
              </div>
            </ContentWindow>
          </div>
        </Modal>
      )}
      {children}
    </ParticipantsModalContext.Provider>
  );
}
