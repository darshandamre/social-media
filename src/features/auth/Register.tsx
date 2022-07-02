import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "../common";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../generated/graphql";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .trim()
    .matches(/^[a-zA-Z0-9_]*$/, {
      message: "username can only contain letters, numbers and '_'"
    })
    .min(3, "must be more that 3 characters")
    .max(15, "must be less then 15 characters"),
  email: yup.string().required().trim().email("invalid email"),
  name: yup.string().trim().max(50, "name can't be more than 50 characters"),
  password: yup.string().required().min(4, "password too short")
});

type RegisterFormData = {
  username: string;
  email: string;
  name: string;
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
      name: "",
      password: ""
    },
    resolver: yupResolver(registerSchema)
  });

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = handleSubmit(async input => {
    try {
      const { data } = await register({ variables: { input } });
      if (data?.register.errors) {
        return data.register.errors.forEach(({ field, message }) => {
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
        <MyTextField control={control} name="name" label="name" />
        <MyTextField control={control} name="username" label="username" />
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
