import { createContext } from "react";

export const ParticipantsModalContext = createContext<
  | {
      open: (title: string, start_at: Date, participants: string[]) => void;
    }
  | undefined
>(undefined);
