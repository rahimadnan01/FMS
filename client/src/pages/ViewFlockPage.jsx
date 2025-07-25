import { NavLink, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
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
  let dailyPercentages;
  let totalPercentage;
  let averageProduction;
  const buttons = [
    {
      label: "View Daily Reports",
      to: `/flocks/${id}/dailyReports`,
    },
    {
      label: "View Monthly Reports ",
      to: `/flocks/${id}/monthlyReports`,
    },
    {
      label: "View Weekly Reports ",
      to: `/flocks/${id}/weeklyReports`,
    },
  ];
  const { data, error, loading } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}`
  );

  if (data) {
    dailyPercentages = data?.dailyReports.map(
      (report) => (report.eggsCollected / data?.flock.remainingBirds) * 100
    );

    totalPercentage = dailyPercentages.reduce((sum, r) => sum + r, 0);

    averageProduction = Math.ceil(totalPercentage / data?.dailyReports?.length);
  }

  const generatePdf = () => {
    if (!data) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${data.flock.name} Report`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Name:${data.flock.name}`, 20, 40);
    doc.text(`Breed: ${data.flock.breed}`, 20, 50);
    doc.text(`Quantity: ${data.flock.totalBirds}`, 20, 60);
    doc.text(`Mortality: ${data.flock.mortality || 0}`, 20, 70);
    doc.text(`Production %: ${averageProduction || 0}`, 20, 80);
    doc.text(`Remaining Birds: ${data.flock.remainingBirds || 0}`, 20, 90);
    doc.text(`Total Production: ${data.flock.totalProduction || 0}`, 20, 100);
    doc.text(
      `Total Feed Stock: ${data.feedStock.totalFeedStock || 0}`,
      20,
      110
    );
    doc.text(`Feed Consumed: ${data.feedStock.feedConsumed || 0}`, 20, 120);
    doc.text(`Remaining Feed: ${data.feedStock.remainingFeed || 0}`, 20, 130);
    doc.text(`Water Intake: ${data.flock.waterIntake || 0}`, 20, 140);

    doc.save(`${data.flock.name}-report.pdf`);
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
                label={`Production %: ${averageProduction || 0}`}
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
              <Chip
                className="flock-badge"
                label={`Water Intake: ${data.flock.waterIntake || 0}`}
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
          <Button variant="contained" color="success" onClick={generatePdf}>
            Download Flock Report
          </Button>
        </div>
      </div>
    </>
  );
}

export default ViewFlockPage;
