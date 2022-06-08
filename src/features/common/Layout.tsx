import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { theme } from "../../theme";
import { LeftSidebar } from "./LeftSidebar";

const Layout = () => {
  return (
    <Grid container height="100%" maxWidth="60rem" mx="auto">
      <Grid item xs={3}>
        <LeftSidebar />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          borderLeft: `1px solid ${theme.palette.background.paper}`,
          borderRight: `1px solid ${theme.palette.background.paper}`
        }}>
        <Outlet />
      </Grid>
      {/* TODO: right sidebar */}
    </Grid>
  );
};

export { Layout };
