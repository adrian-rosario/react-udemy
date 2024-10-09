import { useEffect, useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import "./loc.js";
import { sortPlacesByDistance } from "./loc.js";

const theLocalStorage = localStorage.getItem("favoritePlaces") || []; // if undefined use an empty array
let mapFromLocalStorageValues = [];

// console.log("thelocal: " + theLocalStorage.length > 0);

if (theLocalStorage.length > 0) {
  const existingLocalStorage = JSON.parse(theLocalStorage);
  mapFromLocalStorageValues = existingLocalStorage.map((savedPlaceId) =>
    AVAILABLE_PLACES.find((place) => place.id === savedPlaceId)
  );
}

// - side effect w/o using useEffect()
// const existingLocalStorage = JSON.parse(
//   localStorage.getItem("favoritePlaces") || []
// ); // if undefined use an empty array
// const mapFromLocalStorageValues = existingLocalStorage.map((savedPlaceId) =>
//   AVAILABLE_PLACES.find((place) => place.id === savedPlaceId)
// );

function App() {
  // - const modal = useRef();
  const [getModalIsOpen, setModalIsOpen] = useState(false);

  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(mapFromLocalStorageValues);
  // -
  // console.log("🦊 " + JSON.stringify(pickedPlaces));
  const [getAvailablePlaces, setAvailablePlaces] = useState([]);

  // -- useEffect executes AFTER the component execution is complplete,
  // not executed right away
  // -- does not incur the infinite loop issue
  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
      });
    },
    [
      /* dependencies array, if included, only executed dependencies get called again when state is updated   */
    ]
  );

  // -
  // useEffect(
  //   () => {
  //     const existingLocalStorage =
  //       JSON.parse(localStorage.getItem("favoritePlaces")) || []; // if undefined use an empty array
  //     const mapFromLocalStorageValues = existingLocalStorage.map(
  //       (savedPlaceId) => {
  //         AVAILABLE_PLACES.find((place) => {
  //           place.id === savedPlaceId;
  //         });
  //       }
  //     );
  //     setPickedPlaces(mapFromLocalStorageValues);
  //   },
  //   [] /* will only run once if we include this array */
  // );

  // - get location, sort places by distance
  // - will occur later while the geolocation is complete
  // - side effect, however, we run into infinite loop issue bc the
  // state update is being called if we do this here:
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const sortedPlaces = sortPlacesByDistance(
  //     AVAILABLE_PLACES,
  //     position.coords.latitude,
  //     position.coords.longitude
  //   );

  //   setAvailablePlaces(sortedPlaces);
  // });

  function handleStartRemovePlace(id) {
    // - modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // - modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const existingData = localStorage.getItem("favoritePlaces");
    let existingLocalStorage = [];

    // console.log("existing data? \n" + existingData);

    if (existingData) {
      existingLocalStorage =
        // - data must be converted to a string first
        JSON.parse(existingData); // if undefined use an empty array
    }

    // - existing id check, if not found, capture it
    if (existingLocalStorage.indexOf(id) === -1) {
      localStorage.setItem(
        "favoritePlaces",
        JSON.stringify([id, ...existingLocalStorage])
      );
    }
  }

  const handleRemovePlace = useCallback(
    // -
    function handleRemovePlace() {
      // - so we don't run into potential infinite loop w/ modal

      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      // - modal.current.close();
      setModalIsOpen(false);

      // -
      const existingLocalStorage =
        JSON.parse(localStorage.getItem("favoritePlaces")) || []; // if undefined use an empty array
      localStorage.setItem(
        "favoritePlaces",
        // - drop the item if the condition is false, if true we want to keep it
        existingLocalStorage.filter((theItemId) => {
          theItemId !== selectedPlace.current; // - if these ids do not match, it is not an item we want to delete, we return true
        })
      );
    },
    [
      /* props, state values, context values, other functions, should be added here, in this case there are none */
    ]
  );

  //   }

  return (
    <>
      {/* before: <Modal ref={modal}> onClose={handleStopRemovePlace} */}
      <Modal open={getModalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title='Available Places'
          places={AVAILABLE_PLACES}
          fallbackText='Sorting places by distance.'
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
