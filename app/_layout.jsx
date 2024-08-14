import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";

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
  return <MainLayout />;
}
