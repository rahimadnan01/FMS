import { NavLink, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { jsPDF } from "jspdf";
import useFetch from "../hooks/useFetch";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../components/UI/ErrorMessage";
const formatDate = (isoString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

function ViewDailyReport() {
  let { id, dailyReportId } = useParams();
  console.log(dailyReportId);
  const { data, error, loading } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReport/${dailyReportId}`
  );

  const generatePdf = () => {
    if (!data) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${formatDate(data.Date)} daily Report`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Mortality: ${data.mortality}`, 20, 40);
    doc.text(`Feed Consumed: ${data.feedConsumed}`, 20, 50);
    doc.text(`Eggs Collected: ${data.eggsCollected}`, 20, 60);
    doc.text(`Water Intake: ${data.waterIntake || 0}`, 20, 70);
    doc.text(`Min Temp: ${data.minTemp}`, 20, 80);
    doc.text(`Max Temp: ${data.maxTemp}`, 20, 90);

    doc.save(`${formatDate(data.Date)}.pdf`);
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
                label={`Mortality: ${data.mortality}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Feed Consumed: ${data.feedConsumed}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Eggs Collected: ${data.eggsCollected}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Water Intake: ${data.waterIntake || 0}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Min Temp: ${data.minTemp}`}
                variant="outlined"
              />
              <Chip
                className="flock-badge"
                label={`Max Temp: ${data.maxTemp}`}
                variant="outlined"
              />
            </div>

            <div className="flock-info">
              <FontAwesomeIcon icon={faCalendarDays} className="flock-icon" />
              <span>Daily Report Date: {formatDate(data.Date)}</span>
            </div>
          </CardContent>
        </Card>
        <div className="report-buttons">
          <NavLink to={`/flocks/${id}/dailyReports`}>
            <Button variant="contained" color="success">
              Back
            </Button>
          </NavLink>
          <Button variant="contained" color="success" onClick={generatePdf}>
            Download Flock Report
          </Button>
        </div>
      </div>
    </>
  );
}

export default ViewDailyReport;
