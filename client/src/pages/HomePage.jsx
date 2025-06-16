import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Navbar from "../layouts/navbar";
import useFetch from "../hooks/useFetch";
function HomePage() {
  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks`
  );
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <>
      <Navbar />
    </>
  );
}

export default HomePage;
