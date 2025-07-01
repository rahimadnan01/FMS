import { useParams, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import NoDataFound from "../components/UI/NoDataFound";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useAuth } from "../context/AuthProvider";
import "./DailyReportsPage.css";

// Helper function to format ISO date string to readable format
const formatDate = (isoString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

function WeeklyReports() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/weeklyReport`
  );

  const handleViewReport = (weeklyReportId) => {
    navigate(`/flocks/${id}/weeklyReport/${weeklyReportId}`);
  };

  const handleDeleteReport = async (weeklyReportId) => {
    try {
      console.log(weeklyReportId);
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/weeklyReport/${weeklyReportId}`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete Weekly Report", error.message);
    }
  };

  const handleDeleteAllReports = async () => {
    try {
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/weeklyReport`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete All Reports", error.message);
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
    <div className="daily-reports-main">
      <Navbar />
      <div className="daily-reports-col-main">
        {data.length === 0 ? (
          <NoDataFound
            title="No Weekly Reports Available"
            subtitle="You haven’t added any Weekly Reports yet. Start by creating one."
            buttonText="Add Weekly Report"
            buttonLink={`/flocks/${id}/weeklyReport/add`}
            icon="sad-tear"
          />
        ) : (
          data.map((report) => (
            <div key={report._id} className="daily-report-col">
              <div className="report-date">
                <h1>Week Start Date</h1>
                <h3>{formatDate(report.weekStartDate)}</h3>
              </div>
              <div className="report-date">
                <h1>Week End Date</h1>
                <h3>{formatDate(report.weekEndDate)}</h3>
              </div>
              <div className="flock-col-del">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteReport(report._id)}
                  disabled={!user?.role || user?.role === "staff"}
                >
                  Delete Report
                </Button>
              </div>
              <div className="flock-col-update">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleViewReport(report._id)}
                >
                  View Report
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="page-end-btns">
        <div className="report-delete-btn">
          <Button
            variant="contained"
            color="error"
            style={{
              display: data.length == 0 ? "none" : "block",
            }}
            onClick={handleDeleteAllReports}
            disabled={!user?.role || user?.role === "staff"}
          >
            Delete Reports
          </Button>
        </div>
        <div className="add-report-btn">
          <NavLink
            to={`/flocks/${id}/weeklyReport/add`}
            className="no-decoration"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={!user?.role || user?.role === "staff"}
            >
              Add Weekly Report
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default WeeklyReports;
