import { TextField } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

type MyTextFieldProps<T> = UseControllerProps<T> & {
  label: string;
  type?: string;
};

const MyTextField = <T extends FieldValues>({
  control,
  name,
  label,
  type
}: MyTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error }
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      sx={{ my: 1 }}
      {...field}
      label={label}
      type={type}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export { MyTextField };
