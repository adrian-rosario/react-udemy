import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

export default function EventsLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
