import Navbar from "../layouts/Navbar";
import Button from "@mui/material/Button";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import ErrorMessage from "../components/UI/ErrorMessage";
import { NavLink, useNavigate } from "react-router-dom";
import "../pages/FlocksPage.css";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
function FlocksPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks`
  );

  const handleViewFlock = (flockId) => {
    navigate(`/flocks/${flockId}`);
  };

  const handleUpdateFlock = (flockId) => {
    navigate(`/flocks/${flockId}/updateFlock`);
  };

  const handleDeleteFlock = async (flockId) => {
    try {
      console.log(flockId);
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${flockId}`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete Flock", error.message);
    }
  };

  const handleDeleteAllFlock = async () => {
    try {
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete Flock", error.message);
    }
  };

  if (loading)
    return (
      <div className="loader-overlay">
        <div className="diamond-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );

  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  return (
    <>
      <div className="flocks-main">
        <Navbar />
        <h1 className="flocks-main-h1">All Flocks</h1>

        <div className="flocks-col-container">
          {data.length == 0 ? (
            <NoDataFound
              title="No Flocks Available"
              subtitle="You haven’t added any flocks yet. Start by creating one."
              buttonText="Add Flock"
              buttonLink="/flocks/addFlock"
              icon="sad-tear"
            />
          ) : (
            data.map((flock) => (
              <div className="flock-col" key={flock.flock._id}>
                <div className="flock-col-name">
                  <h3>{flock.flock.name}</h3>
                </div>
                <div className="flock-col-del">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteFlock(flock.flock._id)}
                    disabled={!user?.role || user?.role === "staff"}
                  >
                    Delete Flock
                  </Button>
                </div>
                <div className="flock-col-update">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleViewFlock(flock.flock._id)}
                  >
                    View Flock
                  </Button>
                </div>
                <div className="flock-col-view">
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateFlock(flock.flock._id)}
                    disabled={!user?.role || user?.role === "staff"}
                  >
                    Update Flock
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="delete-all">
          <Button
            variant="contained"
            color="error"
            style={{
              display: data.length == 0 ? "none" : "block",
            }}
            onClick={handleDeleteAllFlock}
            disabled={!user?.role || user?.role === "staff"}
          >
            Delete All flocks
          </Button>
        </div>
      </div>
    </>
  );
}

export default FlocksPage;
