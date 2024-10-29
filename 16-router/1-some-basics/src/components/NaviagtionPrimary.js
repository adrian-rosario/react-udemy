import { /* Link, */ NavLink } from "react-router-dom";

// - use 'end' in the '/' route since the forward slash will be in additional paths
export default function NavigationPrimary() {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "activeLink" : undefined)}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/products'
            className={({ isActive }) => (isActive ? "activeLink" : undefined)}
          >
            Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
