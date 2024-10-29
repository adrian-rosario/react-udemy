import EventForm from "../components/EventForm";
import { ALL_EVENTS_HOST } from "../model/constants";
import { json, redirect } from "react-router-dom";

export default function AddNewEventUsingLoader() {
  return (
    <>
      <h2>Add new event.</h2>
      <EventForm method='post' />
    </>
  );
}

export async function addNewEventAction({ request, params }) {
  const formData = await request.formData();

  const formDataFieldValues = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  const postResponse = await fetch(ALL_EVENTS_HOST, {
    method: "POST",
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
