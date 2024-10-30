import {
  Outlet,
  useLoaderData,
  // useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { accessExpirationDateDurationFromLocalStorage } from "../util/authentication";

function RootLayout() {
  // const navigation = useNavigation();

  // - set timer, for auto-logout
  const theToken = useLoaderData();
  // - for programatically triggering submitting the logout form
  const submit = useSubmit();
  useEffect(() => {
    const tokenDuration = accessExpirationDateDurationFromLocalStorage();

    if (!theToken) {
      return;
    }

    if (theToken === "EXPIRED") {
      submit(null, { action: "logout", method: "post" });
      return;
    }

    setTimeout(() => {
      submit(null, { action: "logout", method: "post" });
    }, tokenDuration);
  }, [theToken, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
