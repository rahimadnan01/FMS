import { useAuth } from "../../context/AuthProvider.jsx";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner.jsx";
import ErrorMessage from "../UI/ErrorMessage.jsx";
import Button from "@mui/material/Button";
import "./LoginForm.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
function LoginForm({ userRole }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://fms-1-drlz.onrender.com/api/v1/${userRole}/login`,
        data,
        { withCredentials: true }
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(
          `${userRole} logged in successfully`,
          response.data.data.loggedInUser
        );
        login(response.data.data.loggedInUser);
        navigate("/");
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to login User");
      console.log(`Failed to login user`, error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="loader-overlay">
        <div className="diamond-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  return (
    <>
      <div className="main-form-div">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-field">
            <TextField
              id="outlined-basic"
              label="Email"
              autoComplete="off"
              variant="outlined"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="error-text">Email is required</span>
            )}
          </div>
          <div className="text-field">
            <TextField
              id="outlined-basic"
              label="Password"
              autoComplete="off"
              variant="outlined"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password field is required",
                },
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 Characters",
                },
              })}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>
          <div className="register-link">
            <li className="login-link">
              <NavLink to="/register">Do not have an account? Signup</NavLink>
            </li>
          </div>
          <div>
            <Button variant="contained" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
