import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// -
export async function authenticationPageAction({ request }) {
  // console.log("authentication, action triggered");

  const theSearchParams = new URL(request.url).searchParams;
  const theMode = theSearchParams.get("mode") || "login";

  if (theMode !== "login" && theMode !== "signup") {
    // return;
    throw json({ message: "unsupported page" }, { status: 422 });
  }

  const formData = await request.formData();

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // console.log("sending\n" + JSON.stringify(authData));
  const theResponse = await fetch("http://localhost:8080/" + theMode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // console.log("the response\n" + JSON.stringify(theResponse));

  if (theResponse.status === 422 || theResponse.status === 401) {
    // validation error
    return theResponse;
  }

  if (!theResponse.ok) {
    throw json({ message: "There was problem logging in" }, { status: 500 });
  }

  // - get the authentication token from the response
  const theResponseData = await theResponse.json();
  const theAuthenticationToken = theResponseData.token;

  // console.log("auth token check:\n" + JSON.stringify(theAuthenticationToken));

  // - storing the token in local storage
  localStorage.setItem("authToken", theAuthenticationToken);
  // - log the expiration date/time, so we can accurately purge it when the
  // hour of validity is over
  const expirationDateAndTime = new Date();
  expirationDateAndTime.setHours(expirationDateAndTime.getHours() + 1);
  localStorage.setItem("expirationDate", expirationDateAndTime.toISOString());

  return redirect("/");
}
