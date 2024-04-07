import { createContext } from "react";

export const ErrorModalContext = createContext<
  | {
      open: (msg: string) => void;
    }
  | undefined
>(undefined);
