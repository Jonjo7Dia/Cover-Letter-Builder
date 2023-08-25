import { UserProvider } from "contexts/userContext";
import { AuthContextProvider } from "contexts/authContext";
import { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserProvider>
        <PlausibleProvider domain={"tailoredapplication.com"}>
          <Component {...pageProps} />
        </PlausibleProvider>
      </UserProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
