import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebase } from "./config";

const app = initializeApp(firebase);
export const auth = getAuth(app);
export default app;
