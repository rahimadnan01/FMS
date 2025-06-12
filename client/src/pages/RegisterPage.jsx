import { useState } from "react";
import RegisterForm from "../components/Auth/RegisterForm";

function RegisterPage() {
  const [role, setRole] = useState("admin");
  return (
    <>
      <RegisterForm userRole={role} />
    </>
  );
}

export default RegisterPage;
