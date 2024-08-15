import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../components/redux/config";

const MainLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] == "(tabs)";
    console.log(segments);

    if (!inApp) {
      router.replace("home");
    }
  }, []);

  return <Slot />;
};

export default function _layout() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}
