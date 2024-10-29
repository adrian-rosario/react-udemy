import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EventEditUsingLoader() {
  const loadedData = useRouteLoaderData("event-detail");
  return (
    <>
      <h2>Event edit, using loader.</h2>
      <EventForm method='patch' event={loadedData.event} />
    </>
  );
}
