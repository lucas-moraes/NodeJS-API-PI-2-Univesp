import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";
import { Loader } from "./src/components/Loader";

import { Routes } from "./src/routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black });
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loader />}
    </>
  );
}
