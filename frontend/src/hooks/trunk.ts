import { useEffect, useState } from "react";

export function useExecTrunk<T>(trunk: () => Promise<T>) {
  const [data, setData] = useState<undefined | T>(undefined);

  async function _check() {
    while (true) {
      try {
        setData(await trunk());
        break;
      } catch (err) {
        console.error(err);
        console.log("Retrying in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  useEffect(() => {
    _check();
  }, []);

  return data;
}
