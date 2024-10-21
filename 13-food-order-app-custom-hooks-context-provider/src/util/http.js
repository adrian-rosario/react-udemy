export async function getMeals() {
  const theResponse = await fetch("http://localhost:3000/meals");
  const responseJson = await theResponse.json();

  if (!theResponse.ok) {
    throw new Error("data request failed");
  }

  return responseJson;
}
