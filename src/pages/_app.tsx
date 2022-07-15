import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { AlertProvider } from "../features/alert";
import { theme } from "../theme";
import { useApollo } from "../utils/apolloClient";
import "../index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
