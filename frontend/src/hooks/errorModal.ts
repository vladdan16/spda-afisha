import { useState } from "react";

export function useErrorModal() {
  const [msg, setModal] = useState<string | null>(null);
  const open = (newMsg: string) => setModal(newMsg);
  const close = () => setModal(null);

  return { msg, open, close };
}
