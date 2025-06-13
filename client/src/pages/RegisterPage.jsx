import { useState } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import "../pages/RegisterPage.css";
import { NavLink } from "react-router-dom";
import Toggle from "../components/materailUI/Toggle";
import { authPageImage } from "../assets/images/images";
function RegisterPage() {
  const [role, setRole] = useState("admin");
  return (
    <>
      <div
        style={{ backgroundImage: `url(${authPageImage})` }}
        className="outer-main-div"
      >
        <div className="inner-main-div-register">
          <div className="register-form-div">
            <div className="toggle-btn">
              <Toggle setRole={setRole} />
            </div>
            <RegisterForm userRole={role} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
