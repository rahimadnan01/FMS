import { useParams } from "react-router-dom";

function UpdateFlockPage() {
  const { id } = useParams();
  return <h1>{id}</h1>;
}

export default UpdateFlockPage;
