import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, configuration) {
  const response = await fetch(url, configuration);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Request failed");
  }

  return responseData;
}

export default function useHttp(url, configuration, initialData) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        // console.log("usehttp, data: " + JSON.stringify(data));
        const responseData =
          /* without await here we get back a promise not the data */ await sendHttpRequest(
            url,
            { ...configuration, body: data }
          );
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something failed.");
      }

      setIsLoading(false);
    },
    [url, configuration]
  );

  useEffect(() => {
    // - so we don't send the request immediately if it's a POST
    if (
      (configuration && configuration.method === "GET") ||
      !configuration.method ||
      !configuration
    ) {
      sendRequest();
    }
  }, [sendRequest, configuration]);

  return {
    error,
    isLoading,
    data,
    sendRequest,
    // - so any component using this hook can have direct access
    // to sendRequest() & use it wherever required
    clearData,
  };
}
