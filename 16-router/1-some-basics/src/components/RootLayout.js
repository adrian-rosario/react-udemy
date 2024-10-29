import { Outlet } from "react-router-dom";
import NavigationPrimary from "./NaviagtionPrimary";
// - Outlet is where child components will be rendered
export default function RootLayout() {
  return (
    <>
      <NavigationPrimary />
      <Outlet />
    </>
  );
}
