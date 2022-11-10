export function setAuth(uid) {
  return localStorage.setItem("uid", uid);
}

export function getAuth(uid) {
  return localStorage.getItem("uid");
}

export function removeAuth() {
  return localStorage.removeItem("uid");
}

export function isAuth() {
  return !!localStorage.getItem("uid");
}
