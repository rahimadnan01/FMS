import { NavLink } from "react-router-dom";
function HomePage() {
  return (
    <>
      <NavLink to={"/FMS/login"}>
        <h1>Login page</h1>
      </NavLink>
    </>
  );
}

export default HomePage;
