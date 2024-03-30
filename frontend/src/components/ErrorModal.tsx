import { useContext } from "react";
import { Modal } from "./Modal";
import { ModalContext } from "../context/ModalContext";

export function ErrorModal() {
  const { msg, close } = useContext(ModalContext);
  const show = msg !== undefined;
  return (
    <>
      {show && (
        <Modal>
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
    </>
  );
}
