import { AfishaContext } from "../contexts/Afisha";
import { IAfisha } from "../services/Afisha";
import { IPersonalAfisha } from "../services/PersonalAfisha";

export function InjectAfisha({
  rawApi,
  personal,
  children,
}: {
  rawApi: IAfisha;
  personal: IPersonalAfisha;
  children: React.ReactNode;
}) {
  return (
    <AfishaContext.Provider value={{ rawApi: rawApi, personal: personal }}>
      {children}
    </AfishaContext.Provider>
  );
}
