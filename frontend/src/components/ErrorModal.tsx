import { useState } from "react";
import { Modal } from "./Modal";
import { ErrorModalContext } from "../contexts/ErrorModal";
import { ErrorMsg } from "./ErrorMsg";

export function ErrorModal({ children }: { children: React.ReactNode }) {
  const [msg, setModal] = useState<string | undefined>(undefined);
  const open = (newMsg: string) => setModal(newMsg);
  const close = () => setModal(undefined);

  const show = msg !== undefined;

  return (
    <ErrorModalContext.Provider value={{ open }}>
      {show && (
        <Modal onClose={close}>
          <ErrorMsg msg={msg} onClose={close} />
        </Modal>
      )}
      {children}
    </ErrorModalContext.Provider>
  );
}
