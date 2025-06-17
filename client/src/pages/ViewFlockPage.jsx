import { useParams } from "react-router-dom";

function ViewFlockPage() {
  const { id } = useParams();
  return <h1>{id}</h1>;
}

export default ViewFlockPage;
