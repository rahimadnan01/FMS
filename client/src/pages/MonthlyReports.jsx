import { useParams } from "react-router-dom";

function MonthlyReports() {
  const { id } = useParams();
  return <h1>{id}</h1>;
}

export default MonthlyReports;