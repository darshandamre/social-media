import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { AlertProvider } from "../features/alert";
import { theme } from "../theme";
import "../index.css";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "include"
});

const client = new ApolloClient({ cache: new InMemoryCache(), link });

const MyApp = ({ Component, pageProps }: AppProps) => {
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
