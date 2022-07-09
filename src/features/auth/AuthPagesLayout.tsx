import { Grid } from "@mui/material";
import React from "react";

type AuthPagesLayoutProps = {
  children: React.ReactNode;
};

const AuthPagesLayout = ({ children }: AuthPagesLayoutProps) => {
  return (
    <Grid
      container
      spacing={0}
      px={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}>
      <Grid item maxWidth="22rem">
        {children}
      </Grid>
    </Grid>
  );
};

export { AuthPagesLayout };
