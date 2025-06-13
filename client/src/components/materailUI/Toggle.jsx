import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
export default function Toggle({ setRole }) {
  const [alignment, setAlignment] = useState("Admin");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment == "Admin") setRole("admin");
    if (newAlignment == "Staff") setRole("staff");
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Admin">Admin</ToggleButton>
      <ToggleButton value="Staff">Staff</ToggleButton>
    </ToggleButtonGroup>
  );
}
