import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./UpdateFlock.css";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../layouts/Navbar";
function UpdateDailyReport() {
  const { id, dailyReportId } = useParams();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReport/${dailyReportId}`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(` Daily Report Updated  successfully`, response.data.data);
        navigate(`/flocks/${id}/dailyReports`);
        reset();
      }
    } catch (error) {
      setUpdateError(error.message || "Failed to Update Flock");
      console.log(`Failed to Update flock`, error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  let { data, loading, error } = useFetch(
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}/dailyReport/${dailyReportId}`
  );
  if (data) console.log(data);
  if (loading || updateLoading)
    return (
      <div className="loader-overlay">
        <div className="diamond-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );

  if (error || updateError)
    return (
      <ErrorMessage
        message={error || updateError}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className="update-flock-main">
      <Navbar />
      <div className="update-form-main">
        <div className="update-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="flock-fields-group" className="flock-fields-group">
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Mortality"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.mortality || 0}
                    {...register("mortality", { required: true })}
                  />
                  {errors.name && (
                    <span className="error-text">Mortality is required</span>
                  )}
                </div>
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Eggs Collected"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.eggsCollected || 0}
                    {...register("eggsCollected", { required: true })}
                  />
                  {errors.breed && (
                    <span className="error-text">
                      Eggs Collected Field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Feed Consumed"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.feedConsumed || 0}
                    {...register("feedConsumed", { required: true })}
                  />
                  {errors.totalBirds && (
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
                    label="Water Intake"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.waterIntake || 0}
                    {...register("waterIntake", { required: true })}
                  />
                  {errors.waterIntake && (
                    <span className="error-text">Water Intake is required</span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Min Temperature"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.minTemp || 0}
                    {...register("minTemp", { required: true })}
                  />
                  {errors.minTemp && (
                    <span className="error-text">
                      Min Temperature is required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Max Temperature"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.maxTemp || 0}
                    {...register("maxTemp", { required: true })}
                  />
                  {errors.maxTemp && (
                    <span className="error-text">
                      Max Temperature is required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Medicine"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.medicine || ""}
                    {...register("medicine", { required: true })}
                  />
                  {errors.medicine && (
                    <span className="error-text">Medicine is required</span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label=" Egg Weight"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.eggWeight || ""}
                    {...register("eggWeight", { required: true })}
                  />
                  {errors.eggWeight && (
                    <span className="error-text">
                      Weight of Bird is required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label=" Bird Age"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.birdAge || ""}
                    {...register("birdAge", { required: true })}
                  />
                  {errors.birdAge && (
                    <span className="error-text">Bird Age is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className="update-form-btn">
              <Button variant="contained" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDailyReport;
