import { Grid } from "@mui/material";
import Head from "next/head";
import { LeftSidebar } from "./LeftSidebar";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? title + " | Blaze Social" : "Blaze Social"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
    </>
  );
};

export { Layout };
