import { useState, useCallback, useRef, useEffect } from "react";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendReq = useCallback(
    async (path, method = "GET", body, headers = defaultHeaders) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(`http://localhost:5000/api/${path}`, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current.filter(
          (reqCntr) => reqCntr !== httpAbortController
        );

        if (!response.ok) {
          console.log("here321");
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
        return err;
      }
    },
    []
  );

  function clearError() {
    setError(null);
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abbrtContr) => abbrtContr.abort());
    };
  }, []);

  return { isLoading, error, sendReq, clearError };
}
