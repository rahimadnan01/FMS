import "./ErrorMessage.css";

const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-emoji">😕</div>
      <h2 className="error-title">Oops!</h2>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
