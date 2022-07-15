import { Alert, AlertProps, Slide, Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type AlertState = {
  open: boolean;
  severity?: AlertProps["severity"];
  message: string;
};

export type AlertInfo = Omit<AlertState, "open">;

const initialState: AlertState = {
  message: "",
  open: false
};

type AlertContainerProps = {
  alertCallbackRef: React.MutableRefObject<
    ((alertInfo: AlertInfo) => void) | undefined
  >;
};

const AlertContainer = ({ alertCallbackRef }: AlertContainerProps) => {
  const [alertState, setAlertState] = useState<AlertState>(initialState);
  const { open, message, severity } = alertState;
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    alertCallbackRef.current = alertInfo => {
      setAlertState({ ...alertInfo, open: true });

      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        setAlertState(initialState);
      }, 4000);
    };

    return () => {
      alertCallbackRef.current = undefined;
      timeoutId.current = undefined;
    };
  }, [alertCallbackRef]);

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
