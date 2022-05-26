import { AlertProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";

type AlertState = {
  open: boolean;
  severity?: AlertProps["severity"];
  message: string;
};

type AlertAction = Omit<AlertState, "open">;

const initialState: AlertState = {
  message: "",
  open: false
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload }: PayloadAction<AlertAction>) => {
      state.open = true;
      state.message = payload.message;
      state.severity = payload.severity;
    },
    hideAlert: state => {
      state.open = false;
    }
  }
});

export const alertReducer = alertSlice.reducer;
export const { showAlert, hideAlert } = alertSlice.actions;
export const useAlert = () => useAppSelector(state => state.alert);

export const showAlertThenHide = (
  dispatch: AppDispatch,
  payload: AlertAction,
  time?: number
) => {
  dispatch(showAlert(payload));

  setTimeout(() => {
    dispatch(hideAlert());
  }, time ?? 3000);
};
