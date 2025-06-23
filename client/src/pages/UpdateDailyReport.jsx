import { useParams } from "react-router-dom";
function UpdateDailyReport() {
  let { id, dailyReportId } = useParams();
  return (
    <>
      <h1>{id}</h1>
      <h2>{dailyReportId}</h2>
    </>
  );
}

export default UpdateDailyReport;
