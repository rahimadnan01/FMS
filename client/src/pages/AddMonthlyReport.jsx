import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axiosInstance from "../utils/axiosInstance";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./AddFlockPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddMonthlyReport() {
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
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/monthlyReports`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(` Monthly Report Added  successfully`, response.data.data);
        navigate(`/flocks/${id}/monthlyReports`);
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to Add Monthly Report");
      console.log(`Failed to Add Monthly Report`, error.message);
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
                      id="outlined-basic"
                      label="Month"
                      autoComplete="off"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: 1, max: 12 }}
                      {...register("month", {
                        required: "Month is required",
                        min: {
                          value: 1,
                          message: "Month must be between 1 and 12",
                        },
                        max: {
                          value: 12,
                          message: "Month must be between 1 and 12",
                        },
                      })}
                    />
                    <span className="field-info">
                      Add number of month you want to generate monthly report (1
                      for January, 12 for December)
                    </span>
                    {errors.month && (
                      <span className="error-text">{errors.month.message}</span>
                    )}
                  </div>
                  <div className="field-with-error">
                    <TextField
                      id="outlined-basic"
                      label="Year"
                      autoComplete="off"
                      variant="outlined"
                      {...register("year", { required: true })}
                    />
                    {errors.breed && (
                      <span className="error-text">Year is required</span>
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

export default AddMonthlyReport;
