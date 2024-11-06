"use client";
import ImagePicker from "@/app/components/picker/image-picker";
import classes from "./share.module.css";
import { handleFormSubmit } from "@/host-data/host-form-actions";
import SaveMealButton from "@/app/components/meal/saveMealButton";
import { useFormState } from "react-dom";

// export const metadata = {
//   title: "NextLevel Food: Share",
//   description: "Delicious meals, shared by a food-loving community.",
// };

export default function Share() {
  // - pattern supported by NexJS & React
  // - creates a server action, guaranteed to execute on the server
  // async function handleFormSubmitHere(formData) {
  //   "use server";
  //   const newMeal = {
  //     title: formData.get("title"),
  //     summary: formData.get("summary"),
  //     instructions: formData.get("instructions"),
  //     image: formData.get("image"),
  //     creator: formData.get("name"),
  //     creator_email: formData.get("email"),
  //   };

  //   console.log("📓 new meal data:\n" + JSON.stringify(newMeal));
  // }

  // - for accessing the returned field validation
  // in host-data/host-form-actions.js, before adding this the form action
  // was action={handleFormSubmit}
  const [state, formAction] = useFormState(handleFormSubmit, { message: null }); // - manages state of page/form/submitted/server actions

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {state.message && (
          <>
            <p>Please double check the information you provided.</p>
            <p>{state.message}</p>
          </>
        )}

        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input type='text' id='name' name='name' required />
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input type='email' id='email' name='email' required />
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' required />
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input type='text' id='summary' name='summary' required />
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea
              id='instructions'
              name='instructions'
              rows='10'
              required
            ></textarea>
          </p>

          <ImagePicker label='Recipe Image' name='image' />

          <p className={classes.actions}>
            <SaveMealButton />
            {/* <button type='submit'>Share Meal</button> */}
          </p>
        </form>
      </main>
    </>
  );
}
