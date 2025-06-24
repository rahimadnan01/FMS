import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setData(null);
    console.log("useFetch: fetching url:", url); // Debug log
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });
        if (response.status >= 200 && response.status <= 300) {
          console.log("useFetch: response data:", response.data.data); // Debug log
          setData(response.data.data);
          setError(null);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request cancelled", error.message);
        } else {
          setError(error.message || "Something went Wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // cleanup function
    return () => {
      controller.abort();
    };
  }, [url]);
  return { loading, data, error };
};

export default useFetch;
