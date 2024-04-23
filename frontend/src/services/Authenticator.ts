// tags: [SERVICE, GLOBAL_SINGLETON]

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { makeAuth } from "../firebase";
import { CannotObtainAccessToken } from "../exceptions/authentication";

export async function enterWithEmailAndPassword(
  register: boolean,
  email: string,
  password: string
) {
  const auth = await makeAuth();
  const enter = register
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;
  await enter(auth, email, password);
}

export async function getToken() {
  const auth = await makeAuth();
  const user = auth.currentUser;
  if (user === null) return null;
  return await user.getIdToken();
}

export async function ensureToken() {
  const token = await getToken();
  if (token === null) throw new CannotObtainAccessToken();
  return token;
}

export async function signOut() {
  const auth = await makeAuth();
  await auth.signOut();
}
