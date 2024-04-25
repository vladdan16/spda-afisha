import { useState } from "react";

export function useParticipantsModal() {
  const [state, setState] = useState<{
    title: string;
    start_at: Date;
    participants: string[];
  } | null>(null);

  function open(title: string, start_at: Date, participants: string[]) {
    if (state !== null)
      throw new Error(
        "Trying to open participants modal when it is already open"
      );
    setState({ title, start_at, participants });
  }

  function close() {
    if (state === null)
      throw new Error(
        "Trying to close participants modal when it is already closed"
      );
    setState(null);
  }

  return { state, open, close };
}
