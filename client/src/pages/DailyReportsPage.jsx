import { useParams } from "react-router-dom";

function DailyReportsPage() {
  const { id } = useParams();
  return <h1>{id}</h1>;
}

export default DailyReportsPage;
