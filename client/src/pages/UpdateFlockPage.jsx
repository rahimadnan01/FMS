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
import Navbar from "../layouts/Navbar";
function UpdateFlockPage() {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const { id } = useParams();
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
        `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(` flock Updated  successfully`, response.data.data);
        navigate("/FMS/flocks");
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
    `https://fms-1-drlz.onrender.com/api/v1/flocks/${id}`
  );
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
                    label="Flock Name"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.flock.name}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="error-text">Flock is required</span>
                  )}
                </div>
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Breed Name"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.flock.breed}
                    {...register("breed", { required: true })}
                  />
                  {errors.breed && (
                    <span className="error-text">Breed is required</span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Total Birds"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.flock.totalBirds || 0}
                    {...register("totalBirds", { required: true })}
                  />
                  {errors.totalBirds && (
                    <span className="error-text">Total Birds are required</span>
                  )}
                </div>
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Mortality"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.flock.mortality || 0}
                    {...register("mortality", { required: true })}
                  />
                  {errors.mortality && (
                    <span className="error-text">Mortality is required</span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Total Production"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.flock.totalProduction || 0}
                    {...register("totalProduction", { required: true })}
                  />
                  {errors.totalProduction && (
                    <span className="error-text">
                      Total Production is required
                    </span>
                  )}
                </div>
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Total Feed Stock"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.feedStock.totalFeedStock || 0}
                    {...register("totalFeedStock", { required: true })}
                  />
                  {errors.totalFeedStock && (
                    <span className="error-text">
                      Total Feed Stock is required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-field-update">
                <div className="field-with-error">
                  <TextField
                    id="outlined-basic"
                    label="Remaining Feed"
                    autoComplete="off"
                    variant="outlined"
                    defaultValue={data.feedStock.remainingFeed || 0}
                    {...register("remainingFeed", { required: true })}
                  />
                  {errors.remainingFeed && (
                    <span className="error-text">
                      Remaining Feed is required
                    </span>
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

export default UpdateFlockPage;
