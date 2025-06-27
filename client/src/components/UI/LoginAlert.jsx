import { useAuth } from "../../context/AuthProvider";
import Button from "@mui/material/Button";
import "./LoginAlert.css";

const LoginAlert = () => {
  const { isLogin } = useAuth();
  const path = window.location.pathname;

  // Hide alert on login or register page
  if (isLogin || path === "/FMS/login" || path === "/FMS/register") return null;

  return (
    <div className="login-alert-overlay">
      <div className="login-alert-box">
        <h2>Login Required</h2>
        <p>You must be logged in to use this application.</p>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/FMS/login")}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default LoginAlert;
