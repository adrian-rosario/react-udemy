import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  // useSubmit, // if using theFormAction/router solution
} from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
// - adding tanstack
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchEvent,
  updateEvent,
  tanstackQueryClient,
} from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const theParams = useParams();
  const theId = theParams.id;
  const { state: routerState } = useNavigation();

  const navigate = useNavigate();

  // - if using the theFormAction/router, comment out mutate and navigate and use this:
  // const submit = useSubmit();

  function handleSubmit(formData) {
    // console.log("handle submit\n" + JSON.stringify(formData));
    mutate({ theEvent: formData, eventId: theId });
    navigate("../");

    // - if using the theFormAction/router, comment out mutate and navigate and use this:
    // submit(formData, {method: 'PUT', body: JSON.stringify(formData)});
  }

  function handleClose() {
    navigate("../");
  }

  // - getting the event
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allEvents", theId],
    queryFn: ({ signal }) => fetchEvent({ signal, id: theId }),
    staleTime: 10000, // use cached data if less than ten seconds old
  });

  // - sending the updated details
  // - comment out if using theFormAction/router
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // - when mutate is called, not when it's sucessfully complete
      const updatedEvent = data.theEvent;
      // console.log("updated event:\n" + JSON.stringify(updatedEvent));

      // - for rolling back if there is an error
      await tanstackQueryClient.cancelQueries({
        // - cancel any existing outgoing useQuery queries (prevents clashing)
        queryKey: ["allEvents", theId],
      });
      const previousEventDataEntry = await tanstackQueryClient.getQueryData([
        "allEvents",
        theId,
      ]);

      tanstackQueryClient.setQueryData(["allEvents", theId], updatedEvent);

      return { previousEventDataEntry };
    },

    // - handling if mutation fails, optimistic updating
    onError: (/* error, data, */ context) => {
      // - roll back the data if there was an error
      tanstackQueryClient.setQueryData(
        ["allEvents", theId],
        context.previousEventDataEntry
      );
    },
    onSettled: () => {
      // - purge the cache
      tanstackQueryClient.invalidateQueries(["allEvents", theId]);
    },
  });

  return (
    <Modal onClose={handleClose}>
      <h2>
        Edit event <small>now using tanstack</small>
      </h2>

      <EventForm inputData={data} onSubmit={handleSubmit}>
        {isError && (
          <>
            <ErrorBlock
              title='Sorry, could not load event.'
              message={error.info?.message || "Try again."}
            />
            <Link to='../' className='button'>
              OK
            </Link>
          </>
        )}

        {!isPending && !isError && (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Update
            </button>
          </>
        )}
      </EventForm>
      {isPending && <p>Sending changes...</p>}

      {routerState === "submitting" && <p>Data in transit...</p>}
    </Modal>
  );
}

// - for loading data w/ router before page renders
export function editEventLoader({ params }) {
  // console.log("editEventLoader\n" + JSON.stringify(params));
  return tanstackQueryClient.fetchQuery({
    queryKey: ["allEvents", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

// - alternative approach embracing React Router featues, the code above handling the
// optimisic updating bc onMutate() won't be called using this...
export async function theEditFormAction({ request, params }) {
  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);

  await updateEvent({
    id: params.id,
    event: updatedEvent,
  });

  await tanstackQueryClient.invalidateQueries(["allEvents", params.id]);

  return redirect("../");
}
