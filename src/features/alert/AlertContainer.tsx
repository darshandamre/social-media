import { Alert, Slide, Snackbar } from "@mui/material";
import { useAlert } from "./alertSlice";

const AlertContainer = () => {
  const { open, message, severity } = useAlert();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={props => <Slide {...props} direction="up" />}>
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export { AlertContainer };
