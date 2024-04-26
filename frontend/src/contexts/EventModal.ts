import { createContext } from "react";
import { IIdEventData } from "../structs/Event";

export const EventCreationModalContext = createContext<
  | {
      open: () => Promise<IIdEventData | null>;
    }
  | undefined
>(undefined);

export const EventEditModalContext = createContext<
  | {
      open: (data: IIdEventData) => Promise<IIdEventData | null>;
    }
  | undefined
>(undefined);
