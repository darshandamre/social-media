import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "../common";
import { useLoginMutation } from "../../app/api";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().required().trim().email("invalid email"),
  password: yup.string().required()
});

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(loginSchema)
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = handleSubmit(async input => {
    try {
      const payload = await login({ input }).unwrap();
      if (payload.login.errors) {
        return payload.login.errors.forEach(({ field, message }) => {
          setError(field as keyof LoginFormData, {
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
    <Box mb={8}>
      <Typography variant="h4" component="div" align="center" pb={4}>
        Login.
      </Typography>
      <form onSubmit={handleLogin}>
        <MyTextField control={control} name="email" label="email" />
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
          Login
        </Button>
        <Button
          sx={{ width: "100%", my: 1, borderRadius: "16px", fontWeight: "600" }}
          size="large"
          type="button"
          onClick={() => {
            setValue("email", "bob@bob.com");
            setValue("password", "bob123");
            handleLogin();
          }}
          variant="outlined"
          disabled={isSubmitting}>
          Login with test credentials
        </Button>
      </form>

      <Typography variant="body1" align="center" my={1}>
        Don't have an account?{" "}
        <Typography
          variant="body1"
          component={Link}
          to="/register"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline"
            }
          }}>
          Create Account
        </Typography>
      </Typography>
    </Box>
  );
};

export { Login };
