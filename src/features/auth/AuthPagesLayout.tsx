import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

type AuthPagesLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const AuthPagesLayout = ({ children, title }: AuthPagesLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? title + " | Blaze Social" : "Blaze Social"}</title>
      </Head>
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
    </>
  );
};

export { AuthPagesLayout };
