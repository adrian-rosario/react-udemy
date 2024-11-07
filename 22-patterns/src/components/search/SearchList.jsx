import { useState, useRef } from "react";

export default function SearchList({ items, children, itemKeyFunction }) {
  // -
  const [theSearchTerm, setTheSearchTerm] = useState("");

  // - adding debounding
  const lastChange = useRef();

  function handleTextChange(event) {
    // - adding debouncing
    if (lastChange.current) {
      // - will be true if we did store a timeout id reference, we need to clear
      // it so we can start a new one
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      // - clear the stored timer
      lastChange.current = null;
      // store the timeout id as a ref
      setTheSearchTerm(event.target.value);
    }, 500);

    // - first iteration
    // setTheSearchTerm(event.target.value);
  }

  const theSearchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(theSearchTerm.toLowerCase())
  );

  return (
    <>
      <div className='searchable-list'>
        <input
          type='search'
          placeholder='Search...'
          onChange={handleTextChange}
        />
        <ul>
          {theSearchResults.map((item) => (
            <li key={itemKeyFunction(item)}>{children(item)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
