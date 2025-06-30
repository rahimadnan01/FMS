import { NavLink, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import useFetch from "../hooks/useFetch";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function ViewWeeklyReport() {
  let { id, weeklyReportId } = useParams();
  const { data, error, loading } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/weeklyReport/${weeklyReportId}`
  );
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
  if (!data) return null;

  // Helper function to format ISO date string to readable format
  const formatDate = (isoString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="view-flock-main">
        <Navbar />
        <Card className="flock-card">
          <CardContent className="flock-content">
            <div className="flock-badges">
              <Chip
                className="flock-badge"
                label={`Mortality: ${data.totalMortality}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Feed Consumed: ${data.totalFeedConsumed}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Eggs Collected: ${data.totalEggsCollected}`}
                variant="outlined"
              />
            </div>
            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Week Start Date: {formatDate(data.weekStartDate)}</span>
            </div>
            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Week End Date: {formatDate(data.weekEndDate)}</span>
            </div>
          </CardContent>
        </Card>
        <div className="report-buttons">
          <NavLink to={`/flocks/${id}/weeklyReports`}>
            <Button variant="contained" color="success">
              Back
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ViewWeeklyReport;
