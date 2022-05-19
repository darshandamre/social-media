import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { theme } from "../../theme";
import { LeftSidebar } from "./LeftSidebar";

const Layout = () => {
  return (
    <Grid container height="100%" maxWidth="120rem" mx="auto">
      <Grid item xs={4} md={3} lg={2.5}>
        <LeftSidebar />
      </Grid>
      <Grid
        item
        xs={8}
        md={6}
        sx={{
          borderLeft: `1px solid ${theme.palette.background.paper}`,
          borderRight: `1px solid ${theme.palette.background.paper}`
        }}>
        <Outlet />
      </Grid>
      {/* right sidebar */}
    </Grid>
  );
};

export { Layout };
