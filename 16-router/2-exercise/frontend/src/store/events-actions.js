import { eventsActions } from "./events-slice";
import { ALL_EVENTS_HOST } from "../model/constants";

export const loadEventsFromDb = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const theRequestResponse = await fetch(ALL_EVENTS_HOST);

      if (!theRequestResponse.ok) {
        throw new Error("There was a problem loading Events.");
      }

      const theData = theRequestResponse.json();

      return theData;
    };

    try {
      const theEventsData = await fetchData();
      // console.log("👍🏼 fetched events\n" + JSON.stringify(theEventsData));
      dispatch(
        eventsActions.replaceEvents({
          events: theEventsData.events || [],
        })
      );
    } catch (error) {
      throw new Error("Something went wrong.");
    }
  };
};
