import { navLogo } from "../assets/images/images";
import { NavLink } from "react-router-dom";
import "../layouts/Navbar.css";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
function Navbar() {
  const { isLogin, logout, user } = useAuth();
  let [role, setRole] = useState("");
  useEffect(() => {
    if (user && user.role == "admin") setRole("admin");
    else if (user && user.role == "staff") setRole("staff");
  }, [user]);
  const handleLogout = async () => {
    try {
      console.log(role);
      const response = await axios.post(
        `https://fms-1-drlz.onrender.com/api/v1/${role}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      logout();
      console.log("User logout successfully", response.data.data.loggedOutUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="main-nav">
      <div className="logo">
        <NavLink to={"/FMS"}>
          <img src={navLogo} alt="" />
        </NavLink>
      </div>
      <div className="links">
        <ul>
          <li>
            <NavLink to={"/FMS/flocks"} className={"nav-link"}>
              Flocks
            </NavLink>
          </li>
          <li>
            <NavLink className={"nav-link"}>Staff</NavLink>
          </li>
          <li>
            <NavLink to={"/FMS/flocks/addFlock"} className={"nav-link"}>
              Add Flock
            </NavLink>
          </li>
          <li>
            <NavLink className={"nav-link"}>Add Staff</NavLink>
          </li>
        </ul>
      </div>
      <div className="profile">
        {isLogin ? (
          <div>
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <NavLink to={"/FMS/login"}>
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
