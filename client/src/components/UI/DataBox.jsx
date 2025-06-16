import "../UI/DataBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function DataBox({ label, value, iconName }) {
  return (
    <div className="dataBox">
      <FontAwesomeIcon icon={["fas", iconName]} className="icon" />
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DataBox;
