import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "./MyTextField";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "username too short")
    .max(50, "username too long"),
  email: yup.string().required().email("invalid email"),
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup.string().required().min(4, "password too short")
});

type RegisterFormData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: ""
    },
    resolver: yupResolver(registerSchema)
  });

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: 350
      }}>
      <Typography my={3} variant="h3" component="div" align="center">
        Sign up
      </Typography>
      <form
        onSubmit={handleSubmit(async data => {
          return await new Promise(res => {
            setTimeout(() => res(true), 1000);
          });
        })}>
        <MyTextField control={control} name="username" label="username" />
        <MyTextField control={control} name="email" label="email" />
        <MyTextField control={control} name="firstName" label="first name" />
        <MyTextField control={control} name="lastName" label="last name" />
        <MyTextField
          control={control}
          name="password"
          label="password"
          type="password"
        />
        <Button
          sx={{ width: "100%", my: 1, borderRadius: "16px" }}
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitting}>
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export { Register };
