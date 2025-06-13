import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import Toggle from "../components/materailUI/Toggle";
import "../pages/LoginPage.css";
import { authPageImage } from "../assets/images/images.js";
function LoginPage() {
  const [role, setRole] = useState("admin");
  return (
    <>
      <div
        style={{ backgroundImage: `url(${authPageImage})` }}
        className="outer-main-div"
      >
        <div className="inner-main-div-login">
          <div className="Login-form-div">
            <div className="toggle-btn">
              <Toggle setRole={setRole} />
            </div>
            <LoginForm userRole={role} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
