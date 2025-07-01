import { navLogo } from "../assets/images/images";
import { NavLink } from "react-router-dom";
import "../layouts/Navbar.css";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { isLogin, logout, user } = useAuth();
  let [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="main-nav">
      <div className="logo">
        <NavLink to={"/"} tabIndex={0} aria-label="Home">
          <img src={navLogo} alt="FMS Logo" />
        </NavLink>
      </div>
   
      <button
        className="menu-icon"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-slide-menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
      {/* Sliding menu for mobile */}
      <div
        className={`navbar-slide-menu${menuOpen ? " open" : ""}`}
        id="navbar-slide-menu"
      >
        <ul>
          <li>
            <NavLink
              to={"/flocks"}
              className={"nav-link"}
              onClick={handleNavClick}
            >
              Flocks
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/staff"}
              className={"nav-link"}
              onClick={handleNavClick}
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/flocks/addFlock"}
              className={"nav-link"}
              onClick={handleNavClick}
            >
              Add Flock
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/add-staff"}
              className={"nav-link"}
              onClick={handleNavClick}
            >
              Add Staff
            </NavLink>
          </li>
        </ul>
        <div className="profile">
          {isLogin ? (
            <div>
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : (
            <NavLink to={"/login"} onClick={handleNavClick}>
              <button>Login</button>
            </NavLink>
          )}
        </div>
      </div>
      {/* Desktop links/profile */}
      <div className="links desktop-only">
        <ul>
          <li>
            <NavLink to={"/flocks"} className={"nav-link"}>
              Flocks
            </NavLink>
          </li>
          <li>
            <NavLink to={"/staff"} className={"nav-link"}>
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to={"/flocks/addFlock"} className={"nav-link"}>
              Add Flock
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-staff"} className={"nav-link"}>
              Add Staff
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile desktop-only">
        {isLogin ? (
          <div>
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <NavLink to={"/login"}>
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
