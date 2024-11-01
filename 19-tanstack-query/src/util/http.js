import { QueryClient } from "@tanstack/react-query";

export async function fetchEvents({ signal, searchTerm, max }) {
  // src/components/Events/FindEventSection.jsx
  // src/components/Events/NewEventsSection.jsx

  let theQuery = "";

  if (searchTerm && max) {
    theQuery = "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    theQuery = "?search=" + searchTerm;
  } else if (max) {
    theQuery = "?max=" + max;
  }

  const response = await fetch("http://localhost:3000/events" + theQuery, {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const theResponse = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!theResponse.ok) {
    const theError = new Error("Creating an event had an error");
    theError.code = theResponse.status;
    theError.info = await theResponse.json();
    throw theError;
  }

  const { event } = await theResponse.json();

  return event;
}

export async function fetchImagesArray({ signal }) {
  const theResponse = await fetch("http://localhost:3000/events/images", {
    signal,
  });

  if (!theResponse.ok) {
    const theError = new Error("Images could not be retrieved.");
    theError.code = theResponse.status;
    theError.info = await theResponse.json();
    throw theError;
  }

  const { images } = await theResponse.json();
  return images;
}

// - moved here from app.js
export const tanstackQueryClient = new QueryClient();

export async function fetchEvent({ id, signal }) {
  // console.log("fetch event: " + id);
  const theResponse = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!theResponse.ok) {
    const theError = new Error(
      "There was a problem getting event information."
    );
    theError.code = theResponse.status;
    theError.info = await theResponse.json();
    throw theError;
  }

  const { event } = await theResponse.json();
  // console.log("event?\n" + JSON.stringify(event));
  return event;
}

export async function deleteEvent({ id }) {
  const theResponse = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });
  if (!theResponse.ok) {
    const theError = new Error("There was a problem deleting event.");
    theError.code = theResponse.status;
    theError.info = await theResponse.json();
    throw theError;
  }
  return theResponse.json();
}

export async function updateEvent({ theEvent, eventId }) {
  console.log(
    `calling update event on: ${eventId}\n` + JSON.stringify(theEvent)
  );
  const theResponse = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "PUT",
    body: JSON.stringify({ event: theEvent }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!theResponse.ok) {
    const theError = new Error("There was a problem deleting event.");
    theError.code = theResponse.status;
    theError.info = await theResponse.json();
    throw theError;
  }
  return theResponse.json();
}

// - first iteration, before making the fetchEvents more flexible...
/* 
export async function fetchEvents() {
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
*/
