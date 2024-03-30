import { useState } from "react";
import { Modal } from "./Modal";
import { createContext } from "react";

export const ErrorModalContext = createContext<{
  open: (msg: string) => void;
}>({
  open: (msg: string) => {},
});

export function ErrorModal({ children }: { children: React.ReactNode }) {
  const [msg, setModal] = useState<string | undefined>(undefined);
  const open = (newMsg: string) => setModal(newMsg);
  const close = () => setModal(undefined);

  const show = msg !== undefined;

  return (
    <>
      <ErrorModalContext.Provider value={{ open }}>
        {show && (
          <Modal onClose={close}>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
              <p className="text-red-500 text-lg font-bold">Ошибка</p>
              <p className="mb-4">{msg}</p>
              <button
                onClick={close}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </Modal>
        )}
        {children}
      </ErrorModalContext.Provider>
    </>
  );
}
