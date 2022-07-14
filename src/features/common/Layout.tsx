import { Grid } from "@mui/material";
import { LeftSidebar } from "./LeftSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid container height="100%" maxWidth="60rem" mx="auto">
      <Grid item xs={3}>
        <LeftSidebar />
      </Grid>
      <Grid
        item
        xs={8}
        sx={({ palette }) => ({
          borderLeft: `1px solid ${palette.background.paper}`,
          borderRight: `1px solid ${palette.background.paper}`
        })}>
        {children}
      </Grid>
    </Grid>
  );
};

export { Layout };
