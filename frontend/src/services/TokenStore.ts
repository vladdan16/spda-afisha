const key = "token";

export function setToken(token: string) {
  localStorage.setItem(key, token);
}

export function getToken() {
  return localStorage.getItem(key);
}
