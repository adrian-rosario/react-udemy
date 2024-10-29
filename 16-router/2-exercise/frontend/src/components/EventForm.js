import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import classes from "./EventForm.module.css";
import { ALL_EVENTS_HOST } from "../model/constants";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  const theNavigation = useNavigation();
  const formIsSubmitting = theNavigation.state === "submitting";

  const theActionData = useActionData();

  return (
    <Form method={method} className={classes.form}>
      {theActionData && theActionData.errors && (
        <ul>
          {Object.values(theActionData.errors).map((theItem) => (
            <li key={theItem}>{theItem}</li>
          ))}
        </ul>
      )}

      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        {!formIsSubmitting && (
          <button
            type='button'
            onClick={cancelHandler}
            disabled={formIsSubmitting}
          >
            Cancel
          </button>
        )}

        <button disabled={formIsSubmitting}>
          {formIsSubmitting ? "Sending data" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function eventFormAction({ request, params }) {
  const formMethod = request.method;

  const formData = await request.formData();

  const formDataFieldValues = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  let url = ALL_EVENTS_HOST;
  if (formMethod === "PATCH") {
    url = ALL_EVENTS_HOST + "/" + params.id;
  }

  const postResponse = await fetch(url, {
    method: formMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataFieldValues),
  });

  // console.log("post response:\n" + JSON.stringify(postResponse));
  if (postResponse.status === 422) {
    return postResponse;
  }

  if (!postResponse.ok) {
    throw json(
      { message: "There was a problem posting the new event" },
      {
        status: 500,
      }
    );
  }

  return redirect("/using-loader"); //  postResponse;
}
