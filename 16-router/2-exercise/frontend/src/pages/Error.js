import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
  const error = useRouteError();
  let message;
  if (error.status === 500) {
    // - ie. when throwing a new Response that uses
    // JSON.stringify()
    // message = JSON.parse(error.data.message);
    message = error.data.message;
  }

  if (error.status === 404) {
    message = "Please use a valid address.";
  }

  return (
    <>
      <MainNavigation />
      <h2>We're sorry.</h2>
      {message !== null && <p>{message}</p>}
    </>
  );
}
