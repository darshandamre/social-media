import { Alert, Slide } from "@mui/material";
import { useAlert } from "./alertSlice";

const AlertContainer = () => {
  const { open, message, severity } = useAlert();

  return (
    <Slide direction="up" in={open}>
      <Alert
        sx={{
          position: "fixed",
          bottom: "5%",
          left: "5%",
          zIndex: 99
        }}
        severity={severity}
        variant="filled">
        {message}
      </Alert>
    </Slide>
  );
};

export { AlertContainer };
