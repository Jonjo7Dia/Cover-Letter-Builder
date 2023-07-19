import { UserProvider } from "contexts/userContext";
import { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <PlausibleProvider domain={"tailoredapplication.com"}>
        <Component {...pageProps} />
      </PlausibleProvider>
    </UserProvider>
  );
}

export default MyApp;
