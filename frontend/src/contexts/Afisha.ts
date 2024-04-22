import { createContext } from "react";
import { IAfisha } from "../services/Afisha";
import { IPersonalAfisha } from "../services/PersonalAfisha";

export interface IAfishaContext {
  rawApi: IAfisha;
  personal: IPersonalAfisha;
}

export const AfishaContext = createContext<IAfishaContext | undefined>(
  undefined
);
