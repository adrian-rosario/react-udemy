import { useRef, useState } from "react";
// - adding tanstack
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http";
import EventItem from "./EventItem";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

export default function FindEventSection() {
  // - note the use of useRev()
  const searchElement = useRef();

  // - adding tanstack
  const [searchTerm, setSearchTerm] = useState();
  const { data, /* isPending, */ isError, error, isLoading } = useQuery({
    queryFn: ({ signal }) => fetchEvents(signal, searchTerm), // - note anonymous function for passing the request query
    queryKey: ["allEvents", { search: searchTerm }],
    enabled: searchTerm !== undefined, // controlling if the query is sent, ie. on first load of page
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let searchResultsContent = (
    <p>Please enter a search term and to find events.</p>
  );

  if (isLoading) {
    // isPending
    searchResultsContent = <LoadingIndicator />;
  }

  if (isError) {
    searchResultsContent = (
      <ErrorBlock message={error.info?.message || "Failed"} />
    );
  }

  if (data) {
    // console.log("DATA:\n" + JSON.stringify(data));
    searchResultsContent = (
      <ul className='events-list'>
        {data.map((item) => (
          <li key={item.id}>
            <EventItem event={item} />
            {/* <div>{JSON.stringify(item)}</div> */}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='all-events-section'>
      <header>
        <h2>
          Find your next event <small>(now loading with tanstack)</small>!
        </h2>
        <form onSubmit={handleSubmit} id='search-form'>
          <input
            type='search'
            placeholder='Search events'
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>

      {searchResultsContent}
    </section>
  );
}
