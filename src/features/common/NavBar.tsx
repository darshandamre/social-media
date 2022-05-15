import { LoadingButton } from "@mui/lab";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../../app/api";

const NavBar = () => {
  const { data, isLoading } = useMeQuery();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  let body;

  if (isLoading) {
    body = null;
  } else if (data?.me) {
    body = (
      <>
        <Typography variant="button" component="div" sx={{ mr: 2 }}>
          {data.me.username}
        </Typography>
        <LoadingButton
          loading={isLogoutLoading}
          color="inherit"
          onClick={() => logout()}>
          Logout
        </LoadingButton>
      </>
    );
  } else {
    body = (
      <>
        <Button
          component={RouterLink}
          to="/register"
          color="inherit"
          sx={{ mr: 2 }}>
          Signup
        </Button>
        <Button component={RouterLink} to="/login" color="inherit">
          Login
        </Button>
      </>
    );
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              cursor: "pointer",
              mr: "auto",
              textDecoration: "none",
              color: "inherit"
            }}>
            Blaze
          </Typography>
          {body}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { NavBar };
