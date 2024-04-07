import { createContext } from "react";
import { IAfisha } from "../services/Afisha";

export const AfishaContext = createContext<IAfisha | undefined>(undefined);
