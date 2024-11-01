// - import { useEffect, useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
// - adding TanStack
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  // - before TanStack refactor
  /*
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // - before TanStack refactor, moved to /util/http.js
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/events");

      if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    }
 
    fetchEvents()
      .then((events) => {
        setData(events);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // -
  }, []);
  */

  // - adding TanStack

  const { data, isPending, isError, error /*, refetch */ } = useQuery({
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // queryFn expects a function that returns a Promise
    queryKey: ["allEvents", { max: 3 }], // for caching the data returned by the request
    staleTime: 5000,
  });

  let content;

  if (isPending /* isLoading */) {
    content = <LoadingIndicator />;
  }

  if (isError /* error */) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || "Events data fetch failed."}
      /> // - message='Failed to fetch events'
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='new-events-section'>
      <header>
        <h2>
          Recently added events <small>(refactored using TanStack)</small>
        </h2>
      </header>
      {content}
    </section>
  );
}
