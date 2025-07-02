import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setData(null);
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(url, {
          signal: controller.signal,
        });
        if (response.status >= 200 && response.status <= 300) {
          setData(response.data.data);
          setError(null);
        }
      } catch (error) {
        if (error.name === "CanceledError") {
          // request cancelled
        } else {
          setError(error.message || "Something went Wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);
  return { loading, data, error };
};

export default useFetch;
