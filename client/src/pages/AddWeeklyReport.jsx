import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axiosInstance from "../utils/axiosInstance";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./AddFlockPage.css";
import { useState } from "react";

function AddWeeklyReport() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/weeklyReport`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(`Weekly Report Added successfully`, response.data.data);
        navigate(`/flocks/${id}/weeklyReports`);
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to Add Weekly Report");
      console.log(`Failed to Add Weekly Report`, error.message);
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
      <div className="add-flock-main">
        <Navbar />
        <div className="add-flock-form-main">
          <div className="add-flock-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div id="flock-fields-group" className="flock-fields-group">
                <div className="text-field-update">
                  <div className="field-with-error">
                    <TextField
                      id="weekStartDate"
                      label="Week Start Date"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...register("weekStartDate", { required: true })}
                    />
                    {errors.weekStartDate && (
                      <span className="error-text">
                        Week Start Date is required
                      </span>
                    )}
                  </div>
                  <div className="field-with-error">
                    <TextField
                      id="weekEndDate"
                      label="Week End Date"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      {...register("weekEndDate", { required: true })}
                    />
                    {errors.weekEndDate && (
                      <span className="error-text">
                        Week End Date is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="update-form-btn">
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddWeeklyReport;
