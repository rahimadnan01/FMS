import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../components/Auth/RegisterForm.css";
import ErrorMessage from "../components/UI/ErrorMessage";
import "./AddStaff.css";
import Navbar from "../layouts/Navbar";
import { useAuth } from "../context/AuthProvider";

function AddStaff() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getErrorMessage = (error) => {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response?.status === 401)
      return "Unauthorized: Invalid credentials.";
    if (error.response?.status === 403)
      return "Forbidden: You do not have permission.";
    if (error.response?.status === 404) return "Not found.";
    if (error.response?.status === 500)
      return "Server error. Please try again later.";
    return error.message || "Failed to register staff";
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fms-1-drlz.onrender.com/api/v1/staff/register",
        data,
        { withCredentials: true }
      );
      if (response.status >= 200 && response.status < 300) {
        navigate("/login");
        reset();
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // Disable form if user.role is not defined or is staff
  const isDisabled = !user?.role || user?.role === "staff";

  if (isDisabled) {
    return (
      <div className="main-form-div">
        <div className="form">
          <h2>Access Denied</h2>
          <p>You do not have permission to add staff.</p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <>
        <Navbar />
        <div className="loader-overlay">
          <div className="diamond-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </>
    );
  if (error)
    return (
      <>
        <Navbar />
        <ErrorMessage message={error} onRetry={() => setError(null)} />
      </>
    );

  return (
    <div className="add-staff-main">
      <Navbar />
      <div className="add-staff-form-main">
        <div className="add-staff-form">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-field">
              <TextField
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
                label="Email"
                autoComplete="off"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>
            <div className="text-field">
              <TextField
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
            <div>
              <Button variant="contained" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Add Staff"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStaff;
