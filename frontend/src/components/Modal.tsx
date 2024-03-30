import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export function Modal({ children }: { children: React.ReactNode }) {
  const { close } = useContext(ModalContext);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={close}
      >
        {children}
      </div>
    </>
  );
}
