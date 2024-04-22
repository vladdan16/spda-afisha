import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { firebase } from "./config";

export const app = initializeApp(firebase);

export async function makeAuth() {
  const auth = getAuth(app);
  await auth.setPersistence(browserLocalPersistence);
  return auth;
}
