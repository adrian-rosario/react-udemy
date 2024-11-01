import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
// - adding tanstack, for post request, useMutation
// requests are sent only when we want to send them, not sent instantly
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { tanstackQueryClient } from "../../util/http.js";

export default function NewEvent() {
  const navigate = useNavigate();

  // - adding tanstack, send data when the form is submitted
  // using mutate
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    // - we don't want to navigate away or anything unless the new event
    // request was a success
    onSuccess: () => {
      tanstackQueryClient.invalidateQueries({
        queryKey: ["allEvents"],
      });
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    // - only send the request when we have data
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <h4>
        New Event
        <small>
          , now using <code>mutate()</code>
        </small>
        !
      </h4>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Sending data..."}

        {!isPending && (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title='There was a problem.'
          message={error.info?.message || "Failed to create new event."}
        />
      )}
    </Modal>
  );
}
