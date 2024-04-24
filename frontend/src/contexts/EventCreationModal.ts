import { createContext } from "react";
import { IEvent } from "../structs/Event";

export const EventCreationModalContext = createContext<
  | {
      open: () => Promise<IEvent | null>;
    }
  | undefined
>(undefined);
