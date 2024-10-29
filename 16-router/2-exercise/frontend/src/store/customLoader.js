import { ALL_EVENTS_HOST } from "../model/constants";
import { defer, json } from "react-router-dom";

async function loadAllEvents() {
  // - can also access local storage, cookies, etc.
  // - cannot use hooks like useState, loader is not a React
  // component
  const response = await fetch(ALL_EVENTS_HOST);

  if (!response.ok) {
    throw json(
      { message: "There was a problem getting data" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();

    return resData.events;
  }
}

export /* async */ function customLoader() {
  return defer({
    events: loadAllEvents(),
  });

  /*
  // - previous version
  // - can also access local storage, cookies, etc.
  // - cannot use hooks like useState, loader is not a React
  // component
  const response = await fetch(ALL_EVENTS_HOST);

  if (!response.ok) {
    // - one way of displaying error
    // return { error: true, message: "Error fetching data" };
    // throw Error({ message: "There was a problem getting data" }); // display closest Error element
    // throw new Response(
    //   JSON.stringify(
    //     { message: "There was a problem getting data" },
    //     {
    //       status: 500,
    //     }
    //   )
    // );
    throw json(
      { message: "There was a problem getting data" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    // console.log("🚚 events fetched:\n" + JSON.stringify(resData));
    // const res = new Response('any data', {status: 201});

    return resData.events;
  }
  */
  //-
}
