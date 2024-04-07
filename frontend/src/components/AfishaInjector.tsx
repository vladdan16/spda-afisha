import { AfishaContext } from "../contexts/Afisha";
import { IAfisha } from "../services/Afisha";

export function InjectAfisha({
  afisha,
  children,
}: {
  afisha: IAfisha;
  children: React.ReactNode;
}) {
  return (
    <AfishaContext.Provider value={afisha}>{children}</AfishaContext.Provider>
  );
}
