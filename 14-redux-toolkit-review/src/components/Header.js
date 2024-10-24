import classes from "./Header.module.css";
import {
  useSelector,
  useDispatch /* -if class component- connect */,
} from "react-redux";

// - redux devtools
import { authenticationActions } from "../store/authentication-slice";

const Header = () => {
  // - adding redux
  // const authenticationFromState = useSelector(
  //   (state) => state.authenticationStore.loggedIn
  // );

  const dispatch = useDispatch();

  // const handleUserLogin = (event) => {
  //   event.preventDefault();
  //   dispatch(authenticationActions.userLogin());
  // };

  const handleUserLogout = (event) => {
    event.preventDefault();
    dispatch(authenticationActions.userLogOut());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={handleUserLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
