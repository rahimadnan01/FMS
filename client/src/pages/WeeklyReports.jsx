import { useParams } from "react-router-dom";

function WeeklyReports() {
  const { id } = useParams();
  return <h1>{id}</h1>;
}

export default WeeklyReports;
