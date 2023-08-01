import { useAuthStore } from "../../../stores/auth";

export default (to, from, next) => {
  const token = sessionStorage.access_token
    ? sessionStorage.access_token
    : null;
  const roles = sessionStorage.roles
    ? JSON.parse(sessionStorage.roles)
    : [];

  if (sessionStorage.authenticated && token) {
    if (to.meta.roles) {
      // check if user role is included in route meta roles
      const userHasAccess = to.meta.roles.some(role => roles.includes(role));
      if (userHasAccess) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  } else {
    next({ name: 'login' });
  }
};

