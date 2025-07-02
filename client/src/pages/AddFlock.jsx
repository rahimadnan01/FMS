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
function AddFlockPage() {
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
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `https://fms-1-drlz.onrender.com/api/v1/flocks/addFlock`,
        data
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(` flock Added  successfully`, response.data.data);
        navigate("/flocks");
        reset();
      }
    } catch (error) {
      setError(error.message || "Failed to Add Flock");
      console.log(`Failed to Update flock`, error.message);
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
                      label="Flock Name"
                      autoComplete="off"
                      variant="outlined"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="error-text">Flock name is required</span>
                    )}
                  </div>
                  <div className="field-with-error">
                    <TextField
                      id="outlined-basic"
                      label="Breed Name"
                      autoComplete="off"
                      variant="outlined"
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
                      {...register("totalBirds", { required: true })}
                    />
                    {errors.totalBirds && (
                      <span className="error-text">
                        Total Birds are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-field-update">
                  <div className="field-with-error">
                    <TextField
                      id="outlined-basic"
                      label="Total Feed Stock"
                      autoComplete="off"
                      variant="outlined"
                      {...register("totalFeedStock", { required: true })}
                    />
                    {errors.totalFeedStock && (
                      <span className="error-text">
                        Total Feed Stock is required
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

export default AddFlockPage;
