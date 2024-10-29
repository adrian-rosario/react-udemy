// import { useEffect, useState } from "react";
import { Suspense } from "react";
import EventsListForLoader from "../components/EventsListForLoader";
// import { ALL_EVENTS_HOST } from "../model/constants";
import { Await, useLoaderData } from "react-router-dom";

export default function EventsUsingLoder() {
  const fetchedEvents = useLoaderData();

  // // - one way of displaying error
  // if (fetchedEvents.error) {
  //   return (
  //     <div>
  //       <p>{fetchedEvents.message}</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={fetchedEvents.events}>
          {(loadedEventsdata) => (
            <EventsListForLoader events={loadedEventsdata} />
          )}
        </Await>
      </Suspense>
      {/* <EventsListForLoader events={fetchedEvents} /> */}
    </>
  );
}

// - see App.js, refactored using loader:
/*
  {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);

      const response = await fetch(ALL_EVENTS_HOST);

      if (!response.ok) {
        setError("Fetching events failed.");
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
        console.log("🚚 events fetched:\n" + JSON.stringify(resData));
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && (
        <EventsListForLoader events={fetchedEvents} />
      )}
    </>
  );
}
*/
