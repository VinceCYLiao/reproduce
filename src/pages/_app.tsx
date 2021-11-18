import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import theme from "../theme";

const clientSideEmotionCache = createEmotionCache();
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
export default MyApp;
