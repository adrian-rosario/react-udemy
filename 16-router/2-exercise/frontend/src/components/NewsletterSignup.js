import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";

function NewsletterSignup() {
  // - will trigger an action but not initialize a route transition
  // - for triggering and action or loader w/o navigating to the page
  // to which the loader belongs, or the page the action belongs
  // ie. trigger your send request behind the scenes
  const theFetcher = useFetcher();

  const { data, state } = theFetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <theFetcher.Form
      method='post'
      action='/newsletter'
      className={classes.newsletter}
    >
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </theFetcher.Form>
  );
}

export default NewsletterSignup;
