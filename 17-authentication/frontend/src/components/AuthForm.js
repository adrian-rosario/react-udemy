// - import { useState } from 'react';
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // - adding query params
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const submittedActionData = useActionData();

  const navigation = useNavigation();
  const formDataSubmitting = navigation.state === "submitting";

  /*
  // - prior version
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }
    */

  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>

        {submittedActionData && submittedActionData.errors && (
          <ul>
            {Object.values(submittedActionData.errors).map((eachItem) => (
              <li key={eachItem}>{eachItem}</li>
            ))}
          </ul>
        )}

        {submittedActionData && submittedActionData.message && (
          <p>{submittedActionData.message}</p>
        )}

        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create New User" : "Login"}
          </Link>
          <button disabled={formDataSubmitting}>
            {formDataSubmitting ? "Submitting data" : "Go"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
