import { ALL_EVENTS_HOST } from "../model/constants";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { IMAGES_HOST } from "../model/constants";
import { Link } from "react-router-dom";
import EventsListForLoader from "../components/EventsListForLoader";
import { Suspense } from "react";

export default function EventDetailUsingLoader() {
  // const loadedData = useRouteLoaderData("event-detail");
  // - now with defer
  const { event, events } = useRouteLoaderData("event-detail");

  const submit = useSubmit();

  const handleDelete = () => {
    // -
    // console.log("handle delete of item: " + loadedData.event.id);
    const proceedConfirmation = window.confirm(
      "Are you sure you want to delete this item"
    );

    if (proceedConfirmation) {
      console.log("delte, submit");
      submit(null, {
        method: "DELETE",
      });
    }
  };

  return (
    <>
      <Suspense fallback={<p>Loading event...</p>}>
        <Await resolve={event}>
          {(loadedData) => (
            <div className='eventDetailUsingLoader'>
              <h2>
                Event detail <small>(using loader)</small>: <br />
                {loadedData.title} : {loadedData.id}
              </h2>

              <p>{loadedData.content}</p>

              <img
                src={
                  !loadedData.image.includes("http")
                    ? IMAGES_HOST + loadedData.image
                    : loadedData.image
                }
                alt={loadedData.title}
              />

              <p>{loadedData.description}</p>

              <p>{loadedData.date}</p>

              <div className='buttons'>
                <div>
                  <Link to='edit'>Edit</Link>
                </div>
                <div>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<p>Loading events...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsListForLoader events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  // console.log("load event called for id: " + id);
  const theResponse = await fetch(ALL_EVENTS_HOST + "/" + id);

  // console.log("📢 loader, details page, called");

  if (!theResponse.ok) {
    throw json(
      { message: "Could not access event data." },
      {
        status: 500,
      }
    );
  }

  const responseData = await theResponse.json();
  // console.log("event loaded:\n" + JSON.stringify(responseData.event));
  return responseData.event;
}

async function loadAllExistingEvents() {
  // console.log("load existing events called");
  const response = await fetch(ALL_EVENTS_HOST);

  if (!response.ok) {
    throw json(
      { message: "Fetching events failed." },
      {
        status: 500,
      }
    );
  } else {
    // const resData = await response.json();
    // console.log("🚚 events fetched:\n" + JSON.stringify(resData));
  }

  const responseData = await response.json();

  return responseData.events;
}

// - loader for this page
export async function eventDetailsLoader({ request, params }) {
  const id = params.id;
  // console.log("params check: " + JSON.stringify(params));
  // console.log("id check: " + params.id);
  // console.log("id check: " + params.id);

  return defer({
    // - using await as a 'lever' to control if the page should render while data loads
    // - the "Loading event..." fallback will not be see in this case
    event: await loadEvent(id), // awaits for data before rendering component, before navigating to this page component
    events: loadAllExistingEvents(), // render after navigating
  });

  // - before using defer
  /*
  const theId = params.id;
  const theResponse = await fetch(ALL_EVENTS_HOST + "/" + theId);

  // console.log("📢 loader, details page, called");

  if (!theResponse.ok) {
    throw json(
      { message: "Could not access event data." },
      {
        status: 500,
      }
    );
  }

  return theResponse;
  */
  // -
}

export async function deleteEventAction({ request, params }) {
  // console.log("delete event action\n" + JSON.stringify(params));
  const theId = params.id;
  // console.log("delete, id: " + theId);
  const theDeleteRequest = await fetch(ALL_EVENTS_HOST + "/" + theId, {
    method: request.method, // use the method sent
  });

  if (!theDeleteRequest.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/using-loader");
}
