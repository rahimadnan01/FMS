import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loader-overlay">
      <div className="diamond-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
