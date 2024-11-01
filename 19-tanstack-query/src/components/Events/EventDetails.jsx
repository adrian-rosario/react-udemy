import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "../Header.jsx";

// -
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, tanstackQueryClient } from "../../util/http";
import Modal from "../UI/Modal.jsx";
import { useState } from "react";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const theParams = useParams();
  const theId = theParams.id;

  // console.log("the page id: " + theId);

  const { data, isPending /* isError, error, isLoading */ } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: theId }), // - note anonymous function for passing the request query
    queryKey: ["allEvents", theId],
  });

  const navigate = useNavigate();

  const {
    mutate,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    error: errorDelete,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // - mark data as outdated
      tanstackQueryClient.invalidateQueries({
        queryKey: ["allEvents"],
        refetchType: "none", // make sure the existing queries wont't be re-triggred, the deleted page triggers an error
      }),
        navigate("/events");
    },
  });

  function handleDelete() {
    // console.log("handle delete for id: " + theId);
    mutate({ id: theId });
  }

  // - so we can handle getting a user confirmation before deleting
  const [userRequestedDelete, setUserRequestedDelete] = useState(false);

  function handleDeleteInitiated() {
    setUserRequestedDelete(true);
  }

  function handleCancelDelete() {
    setUserRequestedDelete(false);
  }

  return (
    <>
      {userRequestedDelete && (
        <Modal onClose={handleCancelDelete}>
          <h2>Are you sure you would like to delete this event?</h2>

          {isErrorDelete && (
            <ErrorBlock
              title='There was an error deleting'
              message={errorDelete.info?.message || "Please try again later."}
            />
          )}
          {isPendingDelete && <p>Deleting event</p>}
          {!isPendingDelete && (
            <div className='form-actions'>
              <button onClick={handleCancelDelete} className='button-text'>
                Cancel
              </button>
              <button onClick={handleDelete} className='button'>
                Yes, permanently delete.
              </button>
            </div>
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>

      {isPending && <p>Loading event data...</p>}

      {data && (
        <article id='event-details'>
          <header>
            <h1>
              {data.title}
              <small>
                , now using<code>tanstack</code>
              </small>
            </h1>

            <nav>
              <button onClick={handleDeleteInitiated}>Delete</button>
              <Link to='edit'>Edit</Link>
            </nav>
          </header>
          <div id='event-details-content'>
            <img src={`http://localhost:3000/${data.image}`} alt='' />
            <div id='event-details-info'>
              <div>
                <p id='event-details-location'>{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {new Date(data.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  &nbsp; @{data.time}
                </time>
              </div>
              <p id='event-details-description'>{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
