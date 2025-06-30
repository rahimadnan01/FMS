import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./AddFlockPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddDailyReport() {
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
      const response = await axios.post(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReports`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(` Daily Report Added  successfully`, response.data.data);
        navigate(`/flocks/${id}/dailyReports`);
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to Add Daily Report");
      console.log(`Failed to Add Daily Report`, error.message);
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
                      label="Mortality"
                      autoComplete="off"
                      variant="outlined"
                      {...register("mortality", { required: true })}
                    />
                    {errors.name && (
                      <span className="error-text">Mortality is required</span>
                    )}
                  </div>
                  <div className="field-with-error">
                    <TextField
                      id="outlined-basic"
                      label="Feed Consumed"
                      autoComplete="off"
                      variant="outlined"
                      {...register("feedConsumed", { required: true })}
                    />
                    {errors.breed && (
                      <span className="error-text">
                        Feed Consumed is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-field-update">
                  <div className="field-with-error">
                    <TextField
                      id="outlined-basic"
                      label="Eggs Collected"
                      autoComplete="off"
                      variant="outlined"
                      {...register("eggsCollected", { required: true })}
                    />
                    {errors.totalBirds && (
                      <span className="error-text">
                        Eggs Collected are required
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

export default AddDailyReport;
