import { Modal } from "./Modal";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { ErrorMsg } from "./ErrorMsg";
import { useErrorModal } from "../hooks/errorModal";

export function ErrorModal({
  z,
  children,
}: {
  z: number;
  children: React.ReactNode;
}) {
  const { msg, open, close } = useErrorModal();
  const show = msg !== null;
  return (
    <ErrorModalContext.Provider value={{ open }}>
      {show && (
        <Modal onClose={close} z={z}>
          <ErrorMsg msg={msg} onClose={close} />
        </Modal>
      )}
      {children}
    </ErrorModalContext.Provider>
  );
}
