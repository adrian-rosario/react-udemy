import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.inactiveLink
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/events'
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.inactiveLink
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/using-loader'
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.inactiveLink
              }
            >
              Events &mdash; using loader
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/using-loader/new'
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.inactiveLink
              }
            >
              New Event &mdash; using loader
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/newsletter'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <NewsletterSignup />
      </div>
    </header>
  );
}

export default MainNavigation;
