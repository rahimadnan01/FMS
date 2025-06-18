import { NavLink, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import "../pages/ViewFlockPage.css";
import useFetch from "../hooks/useFetch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
const formatDate = (isoString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

function ViewFlockPage() {
  const { id } = useParams();
  const buttons = [
    {
      label: "View Daily Reports",
      to: `/FMS/flocks/${id}/dailyReports`,
    },
    {
      label: "View Monthly Reports ",
      to: `/FMS/flocks/${id}/monthlyReports`,
    },
    {
      label: "View Weekly Reports ",
      to: `/FMS/flocks/${id}/weeklyReports`,
    },
  ];
  const { data, error, loading } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}`
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
  return (
    <>
      <div className="view-flock-main">
        <Navbar />
        <Card className="flock-card">
          <CardContent className="flock-content">
            <h2 className="flock-title">{data.flock.name}</h2>

            <div className="flock-badges">
              <Chip
                className="flock-badge"
                label={`Type: ${data.flock.name}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Breed: ${data.flock.breed}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Quantity: ${data.flock.totalBirds}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Mortality: ${data.flock.mortality || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Production %: ${data.flock.percentProduction || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Remaining Birds: ${data.flock.remainingBirds || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Total Production: ${data.flock.totalProduction || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Total Feed Stock: ${
                  data.feedStock.totalFeedStock || 0
                }`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Feed Consumed: ${data.feedStock.feedConsumed || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Remaining Feed: ${data.feedStock.remainingFeed || 0}`}
                variant="outlined"
              />
            </div>

            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Start Date: {formatDate(data.flock.createdAt)}</span>
            </div>
          </CardContent>
        </Card>
        <div className="report-buttons">
          {buttons.map((btn) => (
            <NavLink to={btn.to}>
              <Button variant="contained" color="success">
                {btn.label}
              </Button>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewFlockPage;
