import { defaultTheme } from "../styles";
import { GlobalStyles } from "../styles/global";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "../methods/app/store";
import { ApolloProvider } from "@apollo/client";
import useApollo from "@/hooks/useApollo";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
