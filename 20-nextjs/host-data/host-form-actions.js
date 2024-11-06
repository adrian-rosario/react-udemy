"use server";

import { revalidatePath } from "next/cache";
import { storeUserSubmittedMeal } from "./host-data-meals";
import { redirect } from "next/navigation";

function valdateFields(text) {
  return !text || text.trim() === "";
}

// - pattern supported by NexJS & React
// - creates a server action, guaranteed to execute on the server
export async function handleFormSubmit(prevState, formData) {
  // before adding useFormState() to the page.js that contains the form, (formData),
  // formData becomes the second argument

  const newMeal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // TODO: why is the image objet is empty, the example shown
  // gets additional data rendering for the image object 🥵
  console.log("😳 new meal:\n" + JSON.stringify(newMeal));

  // - validation example
  if (
    valdateFields(newMeal.title) ||
    valdateFields(newMeal.summary) ||
    valdateFields(newMeal.instructions) ||
    valdateFields(newMeal.creator) ||
    valdateFields(newMeal.creator_email) ||
    !newMeal.creator_email.includes("@")
    // TODO: that image probem
    // || !newMeal.image || newMeal.image.size === 0
  ) {
    // throw new Error("Input invalid");
    return {
      message: "Input invalid",
    };
  }

  await storeUserSubmittedMeal(newMeal);

  revalidatePath("/meals"); // - in production mode, no new data will get added unless we add this,
  // nextjs is told to revalidate the cache that belongs to a routepath. it can be set to
  // 'page' or 'layout' (for 'layout', nested pages will be revalidated as well), ie:
  // ("/meals", "layout")

  redirect("/meals");
}
