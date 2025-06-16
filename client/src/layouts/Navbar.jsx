import { navLogo } from "../assets/images/images";
import { NavLink } from "react-router-dom";
import "../layouts/Navbar.css";
import { useAuth } from "../context/AuthProvider";
function Navbar() {
  const { isLogin } = useAuth();
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
            <NavLink className={"nav-link"}>Flocks</NavLink>
          </li>
          <li>
            <NavLink className={"nav-link"}>Staff</NavLink>
          </li>
          <li>
            <NavLink className={"nav-link"}>Add Flock</NavLink>
          </li>
          <li>
            <NavLink className={"nav-link"}>Add Staff</NavLink>
          </li>
        </ul>
      </div>
      <div className="profile">
        {isLogin ? (
          <div>
            <button>logout</button>
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
