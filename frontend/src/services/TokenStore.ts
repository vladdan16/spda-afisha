const key = "token";

export function setToken(token: string) {
  localStorage.setItem(key, token);
}

export function clearToken() {
  localStorage.removeItem(key);
}

export function getToken() {
  return localStorage.getItem(key);
}

export function ensureToken() {
  const res = getToken();
  if (res === null) throw Error("No access token");
  return res;
}
