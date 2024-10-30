import { redirect } from "react-router-dom";

export function accessAuthenticationTokenFromLocalStorage() {
  const theStoredToken = localStorage.getItem("authToken");

  // - return nothing if we don't have a token
  if (!theStoredToken) {
    return null;
  }

  // - check the date set in local storage
  const tokenDuration = accessExpirationDateDurationFromLocalStorage();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return theStoredToken;
}

export function accessExpirationDateDurationFromLocalStorage() {
  const theStoredExpirationDate = localStorage.getItem("expirationDate");
  const theStoredDateAsDate = new Date(theStoredExpirationDate);
  const now = new Date();

  const duration =
    theStoredDateAsDate.getTime() /* converts to ms */ - now.getTime();
  return duration;
}

export function tokenLoader() {
  return accessAuthenticationTokenFromLocalStorage();
}

// - so we can add guards to paths
export function checkAuthorizationLoader() {
  const loggedIn = accessAuthenticationTokenFromLocalStorage();
  if (!loggedIn) {
    return redirect("/auth?mode=login");
  }
  return null; // to avoid errors
}
