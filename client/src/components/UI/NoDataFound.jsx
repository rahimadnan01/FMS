// components/UI/NoDataFound.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NoDataFound({
  title = "No Data Found",
  subtitle = "Looks like there's nothing here yet.",
  buttonText = "Add New",
  buttonLink = "/FMS/add-flock",
  icon = "sad-tear",
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "4rem",
        color: "#555",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <FontAwesomeIcon
        icon={["fas", icon]}
        size="4x"
        style={{ color: "#aaa" }}
      />
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1">{subtitle}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(buttonLink)}
        sx={{ marginTop: 2 }}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} style={{ marginRight: 8 }} />
        {buttonText}
      </Button>
    </Box>
  );
}

export default NoDataFound;
