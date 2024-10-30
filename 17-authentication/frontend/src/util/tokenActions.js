import { redirect } from "react-router-dom";

export function logoutAction() {
  // - remove token from local storages
  localStorage.removeItem("authToken");
  localStorage.removeItem("expirationDate");
  return redirect("/");
}
