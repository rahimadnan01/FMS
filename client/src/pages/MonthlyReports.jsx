import { useParams, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import NoDataFound from "../components/UI/NoDataFound";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useAuth } from "../context/AuthProvider";
import "./DailyReportsPage.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthlyReports() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/monthlyReports`
  );

  const handleViewReport = (monthlyReportId) => {
    navigate(`/flocks/${id}/monthlyReports/${monthlyReportId}`);
  };

  const handleDeleteReport = async (monthlyReportId) => {
    try {
      console.log(monthlyReportId);
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/monthlyReports/${monthlyReportId}`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete Monthly Report", error.message);
    }
  };

  const handleDeleteAllReports = async () => {
    try {
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/monthlyReports`
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
            title="No Monthly Reports Available"
            subtitle="You haven’t added any Monthly Reports yet. Start by creating one."
            buttonText="Add Monthly Report"
            buttonLink={`/flocks/${id}/monthlyReports/add`}
            icon="sad-tear"
          />
        ) : (
          data.map((report) => (
            <div key={report._id} className="daily-report-col">
              <div className="report-date">
                <h1>Report Month</h1>
                <h3>{monthNames[report.month - 1]}</h3>
              </div>
              <div className="report-date">
                <h1>Report Year</h1>
                <h3>{report.year}</h3>
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
            to={`/flocks/${id}/monthlyReports/add`}
            className="no-decoration"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={!user?.role || user?.role === "staff"}
            >
              Add Monthly Report
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MonthlyReports;

/* Add this to the bottom of the file for NavLink style */
// In DailyReportsPage.css, add:
// .no-decoration { text-decoration: none !important; }
