import React, { createContext, useState } from "react";

interface IModalContext {
  msg: string | undefined;
  open: (msg: string) => void;
  close: () => void;
}

export const ErrorModalContext = createContext<IModalContext>({
  msg: undefined,
  open: (msg: string) => {},
  close: () => {},
});

export const ErrorModalState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [msg, setModal] = useState<string | undefined>(undefined);
  const open = (newMsg: string) => setModal(newMsg);
  const close = () => setModal(undefined);

  return (
    <ErrorModalContext.Provider value={{ msg, open, close }}>
      {children}
    </ErrorModalContext.Provider>
  );
};
