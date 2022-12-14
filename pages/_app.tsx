import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { UserContext } from "../util/context";
import { auth } from "../util/firebase";
// import { NextUIProvider } from "@nextui-org/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserData } from "../util/hooks";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  // const [user, loading, error] = useAuthState(auth);

  const { user, username } = useUserData();

  return (
    <NextUIProvider>
      <Navbar user={user} username={username} />
      <UserContext.Provider value={{ user: user, username: username }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
