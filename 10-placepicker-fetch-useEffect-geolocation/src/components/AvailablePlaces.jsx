import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import * as util from "../helper/loc.js";
import * as utilHttp from "../helper/http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // - common 3 states:
  // data (storing fetched data),
  // loading (reveal to user reqeust has been made)
  // error
  const [getAvailablePlaces, setAvailablePlaces] = useState([]);
  const [getIsLoading, setIsLoading] = useState(false);
  const [getErrorState, setErrorState] = useState();

  // -
  useEffect(() => {
    async function fetchPlacesData() {
      setIsLoading(true);

      try {
        // - block moved to http.js
        // const dataRequest = await fetch("http://localhost:3000/places");
        // const dataJson = await dataRequest.json();

        // if (!dataRequest.ok) {
        //   // - handle error
        //   throw new Error("data request failed");
        // }

        const dataJson = await utilHttp.fetchAvailablePlaces();

        // - location sorts, geolocation does not
        // return a promise
        // so we have to change where we setIsLoading to false
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedByDistance = util.sortPlacesByDistance(
            dataJson.places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedByDistance);
          setIsLoading(false);
        });

        // setAvailablePlaces(dataJson.places);
      } catch (error) {
        // - handle error
        setErrorState({ message: error.message || "There was an error" });
        setIsLoading(false);
      }
      // setIsLoading(false);
    }

    fetchPlacesData();
  }, []);

  if (getErrorState) {
    return <Error title="We're sorry." message={getErrorState.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={getAvailablePlaces}
      fallbackText='No places available.'
      dataLoadingText='Please wait, loading location data.'
      isLoading={getIsLoading}
      onSelectPlace={onSelectPlace}
    />
  );
}
