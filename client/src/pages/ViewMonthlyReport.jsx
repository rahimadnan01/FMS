import { NavLink, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { jsPDF } from "jspdf";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import useFetch from "../hooks/useFetch";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

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

function ViewMonthlyReport() {
  let { id, monthlyReportId } = useParams();

  console.log(monthlyReportId);
  const { data, error, loading } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/monthlyReports/${monthlyReportId}`
  );

  const generatePdf = () => {
    if (!data) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${monthNames[data.month - 1]}-${data.year} Report`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Mortality: ${data.totalMortality}`, 20, 40);
    doc.text(`Feed Consumed: ${data.totalFeedConsumed}`, 20, 50);
    doc.text(`Eggs Collected: ${data.totalEggsCollected}`, 20, 60);
    doc.text(`Water Intake: ${data.totalWaterIntake || 0}`, 20, 70);

    doc.save(`${monthNames[data.month - 1]}-${data.year}.pdf`);
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
              <Chip
                className="flock-badge"
                label={`Water Intake: ${data.totalWaterIntake}`}
                variant="outlined"
              />
            </div>

            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Monthly Report Month: {monthNames[data.month - 1]}</span>
            </div>
            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Monthly Report Year: {data.year}</span>
            </div>
          </CardContent>
        </Card>
        <div className="report-buttons">
          <NavLink to={`/flocks/${id}/monthlyReports`}>
            <Button variant="contained" color="success">
              Back
            </Button>
          </NavLink>
          <Button variant="contained" color="success" onClick={generatePdf}>
            Download Report
          </Button>
        </div>
      </div>
    </>
  );
}

export default ViewMonthlyReport;
