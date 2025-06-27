import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../layouts/Navbar";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/UI/ErrorMessage";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import "./Staff.css";

function Staff() {
  const { data, loading, error } = useFetch(
    "https://fms-1-drlz.onrender.com/api/v1/staff"
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  if (!data || data.length === 0)
    return (
      <div className="staff-main">
        <Navbar />
        <div className="no-staff">No staff found.</div>
      </div>
    );

  return (
    <div className="staff-main">
      <Navbar />
      <h1 className="staff-title">Staff Members</h1>
      <div className="staff-list">
        {data.map((staff) => (
          <div className="staff-card" key={staff._id}>
            <div className="staff-avatar">
              {staff.user.username[0].toUpperCase()}
            </div>
            <div className="staff-info">
              <h2>{staff.user.username}</h2>
              <p>Email: {staff.user.email}</p>
              <span className="staff-role">Role: {staff.user.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;
