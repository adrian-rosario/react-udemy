import classes from "./Auth.module.css";
import {
  useSelector,
  useDispatch /* -if class component- connect */,
} from "react-redux";

// - redux devtools
import { authenticationActions } from "../store/authentication-slice";

const Auth = () => {
  // - adding redux
  const authenticationFromState = useSelector(
    (state) => state.authenticationStore.loggedIn
  );

  const dispatch = useDispatch();

  const handleUserLogin = (event) => {
    event.preventDefault();
    dispatch(authenticationActions.userLogin());
  };

  // const handleUserLogout = (event) => {
  //   event.preventDefault();
  //   dispatch(authenticationActions.userLogOut());
  // };

  return (
    <main className={classes.auth}>
      <section>
        {authenticationFromState && (
          <div>
            User is logged in <br></br>
          </div>
        )}
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button onClick={handleUserLogin}>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
