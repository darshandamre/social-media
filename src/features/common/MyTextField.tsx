import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

type MyTextFieldProps<T> = UseControllerProps<T> & TextFieldProps;

const MyTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: MyTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error }
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      {...props}
      sx={{ my: 1 }}
      {...field}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export { MyTextField };
