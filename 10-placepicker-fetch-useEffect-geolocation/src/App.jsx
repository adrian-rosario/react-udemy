import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import * as utilHttp from "./helper/http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  // -
  const [fetchingSavedPlacesData, setFetchingSavedPlacesData] = useState();

  const [savedPlacesFetchError, setSavedPlacesFetchError] = useState();

  // - load saved places
  useEffect(() => {
    async function getSavedPlaces() {
      setFetchingSavedPlacesData(true);
      try {
        const savedPlaces = await utilHttp.fetchSavedPlaces();
        // console.log("saved places...\n" + JSON.stringify(savedPlaces));
        setUserPlaces(savedPlaces.places);
      } catch (error) {
        setSavedPlacesFetchError({
          message: error.message || "Failed to load saved places",
        });
      }
      setFetchingSavedPlacesData(false);
    }

    getSavedPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // - can place updateUserPlaces here, but would need spinner
    // or other indication something is pending
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // -
    try {
      // console.log("🚚 " + JSON.stringify(selectedPlace));

      await utilHttp.updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces); // roll back change
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
      throw new Error("There was a problem saving the data");
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await utilHttp.updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces); // revert the state
        setErrorUpdatingPlaces({
          message: error.message || "Failed to update",
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces] // re-create if state should change
  );

  function closeError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      {/* initial load would fail bc it's really part of the DOM already (just not open), hence truthy check */}
      {
        <Modal open={errorUpdatingPlaces} onClose={closeError}>
          {errorUpdatingPlaces && (
            <Error
              title='Error'
              message={errorUpdatingPlaces.message}
              onConfirm={closeError}
            />
          )}
        </Modal>
      }

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
        {savedPlacesFetchError && (
          <Error
            title='Saved data error.'
            message={savedPlacesFetchError.message}
          ></Error>
        )}

        {!savedPlacesFetchError && (
          <Places
            title="I'd like to visit ..."
            fallbackText='Select the places you would like to visit below.'
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
            isLoading={fetchingSavedPlacesData}
            dataLoadingText='Loading saved places.'
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
