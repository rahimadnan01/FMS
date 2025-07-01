import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import NoDataFound from "../components/UI/NoDataFound";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/UI/ErrorMessage";
import "./DailyReportsPage.css";
import { useAuth } from "../context/AuthProvider";

const formatDate = (isoString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

function DailyReportsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyreports`
  );

  const handleViewReport = (dailyReportId) => {
    navigate(`/flocks/${id}/dailyReports/${dailyReportId}`);
  };

  const handleUpdateReport = (dailyReportId) => {
    navigate(`/flocks/${id}/dailyReports/${dailyReportId}/update`);
  };

  const handleDeleteReport = async (dailyReportId) => {
    try {
      console.log(dailyReportId);
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReport/${dailyReportId}`
      );
      console.log(response.data.data);
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete Daily Report", error.message);
    }
  };

  const handleDeleteAllReports = async () => {
    try {
      const response = await axios.delete(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReports/deleteAll`
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
            title="No Daily Reports Available"
            subtitle="You haven’t added any Daily Reports yet. Start by creating one."
            buttonText="Add Daily Report"
            buttonLink={`/flocks/${id}/dailyReports/add`}
            icon="sad-tear"
            disabled={!user?.role || user?.role === "staff"}
          />
        ) : (
          data.map((report) => (
            <div key={report._id} className="daily-report-col">
              <div className="report-date">
                <h1>Report Date</h1>
                <h3>{formatDate(report.Date)}</h3>
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
              <div className="flock-col-view">
                <Button
                  variant="contained"
                  onClick={() => handleUpdateReport(report._id)}
                  disabled={!user?.role || user?.role === "staff"}
                >
                  Update Report
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
            to={`/flocks/${id}/dailyReports/add`}
            className="no-decoration"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={!user?.role || user?.role === "staff"}
            >
              Add Daily Report
            </Button>
          </NavLink>
         
        </div>
      </div>
    </div>
  );
}

export default DailyReportsPage;
