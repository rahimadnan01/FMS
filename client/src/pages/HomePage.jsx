import { NavLink } from "react-router-dom";
function HomePage() {
  return (
    <>
      <h1>Hello I am Home Page</h1>
      <li className="login-link">
        <NavLink to="/FMS/register">Do not have an account? Signup</NavLink>
      </li>
      <li className="login-link">
        <NavLink to="/FMS/login">login page</NavLink>
      </li>
    </>
  );
}

export default HomePage;
