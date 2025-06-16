import { useForm } from "react-hook-form";
import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./RegisterForm.css";
import TextField from "@mui/material/TextField";
import axios from "axios";

function RegisterForm({ userRole }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://fms-1-drlz.onrender.com/api/v1/${userRole}/register`,
        data,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status <= 300) {
        console.log(`${userRole} registered successfully`, response.data);
        navigate("/FMS/login");
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to login User");
      console.log("failed to register User");
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
              label="Username"
              autoComplete="off"
              variant="outlined"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="error-text">Username is required</span>
            )}
          </div>
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
              <NavLink to="/FMS/login">Have already registered,Login?</NavLink>
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

export default RegisterForm;
