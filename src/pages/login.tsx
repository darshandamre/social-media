import { useApolloClient } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthPagesLayout } from "../features/auth";
import { MyTextField, NextLinkComposed } from "../features/common";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const loginSchema = yup.object().shape({
  email: yup.string().required().trim().email("invalid email"),
  password: yup.string().required()
});

type LoginFormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
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

  const router = useRouter();
  const from = typeof router.query.from === "string" ? router.query.from : "/";
  const apolloClient = useApolloClient();
  const [login] = useLoginMutation({
    onCompleted: ({ login }) => {
      if (login.errors) {
        return login.errors.forEach(({ field, message }) => {
          setError(field as keyof LoginFormData, {
            type: "server",
            message
          });
        });
      }

      if (login.user) {
        apolloClient.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: {
              __typename: "User",
              id: login.user.id,
              username: login.user.username,
              name: login.user.name,
              amIFollowingThem: false
            }
          }
        });
        router.push(from);
      }
    }
  });

  const handleLogin = handleSubmit(async input => {
    await login({ variables: { input } });
  });

  return (
    <AuthPagesLayout>
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
            sx={{
              width: "100%",
              my: 1,
              borderRadius: "16px",
              fontWeight: "600"
            }}
            size="large"
            type="submit"
            variant="contained"
            disabled={isSubmitting}>
            Login
          </Button>
          <Button
            sx={{
              width: "100%",
              my: 1,
              borderRadius: "16px",
              fontWeight: "600"
            }}
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
          Don&apos;t have an account?{" "}
          <Typography
            variant="body1"
            component={NextLinkComposed}
            to={"/register?from=" + encodeURIComponent(from)}
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
    </AuthPagesLayout>
  );
};

export default Login;
