import { useAuthStore } from "../../../stores/auth";

export default (to, from, next) => {
  const token = sessionStorage.access_token
    ? sessionStorage.access_token
    : null;
  if (sessionStorage.authenticated && token) {
    next();
  } else {
    next({ name: "login" });
  }
};
