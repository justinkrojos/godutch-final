import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

function LoadingSpinner() {
  const theme = useTheme();
  return <ActivityIndicator size="large" color={theme.secondaryText} />;
}

export default LoadingSpinner;
