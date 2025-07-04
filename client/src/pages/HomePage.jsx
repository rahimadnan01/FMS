import { NavLink } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Navbar from "../layouts/Navbar.jsx";
import useFetch from "../hooks/useFetch";
import "../pages/HomePage.css";
import { useEffect, useState } from "react";
import { calculateStats } from "../utils/calculateStats.js";
import DataBox from "../components/UI/DataBox.jsx";
function HomePage() {
  let [stats, setStats] = useState({
    totalFlocks: 0,
    totalProduction: 0,
    totalMortality: 0,
    totalEggs: 0,
    totalFeed: 0,
    remainingFeed: 0,
    totalBirds: 0,
    totalFeedConsumed: 0,
  });
  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks`
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const calculatedStats = calculateStats(data);
      setStats(calculatedStats);
    }
  }, [data]);
  console.log(stats);

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
      <div className="home-main">
        <Navbar />
        <div className="data-boxes">
          <DataBox
            iconName="dove"
            label="Total Birds"
            value={stats.totalBirds}
          />
          <DataBox
            iconName="layer-group"
            label="Total Flocks"
            value={stats.totalFlocks}
          />
          <DataBox
            iconName="skull-crossbones"
            label="Total Mortality"
            value={stats.totalMortality}
          />
          <DataBox
            iconName="chart-line"
            label="Total Production"
            value={Math.floor(stats.totalProduction)}
          />
          <DataBox iconName="box" label="Total Feed" value={stats.totalFeed} />
          <DataBox
            iconName="warehouse"
            label="Remaining Feed"
            value={stats.remainingFeed}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
