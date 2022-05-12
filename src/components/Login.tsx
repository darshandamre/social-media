import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "./MyTextField";

const loginSchema = yup.object().shape({
  email: yup.string().required().email("invalid email"),
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
    formState: { isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(loginSchema)
  });

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: 350
      }}>
      <Typography my={3} variant="h3" component="div" align="center">
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(async data => {
          return await new Promise(res => {
            setTimeout(() => res(true), 1000);
          });
        })}>
        <MyTextField control={control} name="email" label="email" />
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
          Login
        </Button>
      </form>
    </Box>
  );
};

export { Login };
