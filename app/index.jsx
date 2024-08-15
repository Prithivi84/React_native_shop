import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function StatPage() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
