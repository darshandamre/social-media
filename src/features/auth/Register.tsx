import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "./MyTextField";
import { useRegisterMutation } from "../../app/api";
import { Link, useNavigate } from "react-router-dom";

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
    setError,
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

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = handleSubmit(async input => {
    try {
      const payload = await register({ input }).unwrap();
      if (payload.register.errors) {
        return payload.register.errors.forEach(({ field, message }) => {
          setError(field as keyof RegisterFormData, {
            type: "server",
            message
          });
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Box>
      <Typography variant="h4" component="div" align="center" pb={4}>
        Sign up.
      </Typography>
      <form onSubmit={handleRegister}>
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
          sx={{ width: "100%", my: 1, borderRadius: "16px", fontWeight: "600" }}
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitting}>
          Sign up
        </Button>
      </form>

      <Typography variant="body1" align="center" my={1}>
        Already have an account?{" "}
        <Typography
          variant="body1"
          component={Link}
          to="/login"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline"
            }
          }}>
          Log in.
        </Typography>
      </Typography>
    </Box>
  );
};

export { Register };
