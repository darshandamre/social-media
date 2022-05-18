import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

// interface AuthPagesLayoutProps {}

const AuthPagesLayout = () => {
  return (
    <Grid
      container
      spacing={0}
      px={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}>
      <Grid item maxWidth="22rem">
        <Outlet />
      </Grid>
    </Grid>
  );
};

export { AuthPagesLayout };
