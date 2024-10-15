import { useRef, useState, useCallback, useEffect } from "react";
// import { fetchUserPlaces, updateUserPlaces } from "../http.js";
export function useDataFetch(fetchFunction, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [data, setData] = useState(initialValue); // - []
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const dataRetrieved = await fetchFunction(); // - fetchUserPlaces();

        setData(dataRetrieved);
      } catch (error) {
        setError({
          message: error.message || "Failed to load data.",
        });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFunction]);

  return {
    isFetching,
    setIsFetching,
    data,
    setData,
    error,
    setError,
  };
}
