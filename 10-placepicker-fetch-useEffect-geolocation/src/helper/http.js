// -
export async function fetchAvailablePlaces() {
  const dataRequest = await fetch("http://localhost:3000/places");
  const dataJson = await dataRequest.json();

  if (!dataRequest.ok) {
    // - handle error
    throw new Error("data request failed");
  }

  return dataJson;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const putResponseData = await response.json();
  if (!response.ok) {
    throw new Error("Error saving place");
  }
  return putResponseData;
}

export async function fetchSavedPlaces() {
  const dataRequest = await fetch("http://localhost:3000/user-places");
  const dataJson = await dataRequest.json();

  if (!dataRequest.ok) {
    // - handle error
    throw new Error("data request failed");
  }

  return dataJson;
}
