import * as React from "react";
import { Text as RNText, StyleSheet, type TextProps } from "react-native";

interface Props extends TextProps {
  type?: keyof typeof styles;
  children: React.ReactNode;
}

const Text = ({ type, style, children, ...rest }: Props) => {
  return (
    <RNText style={[styles[type ?? "regular"], style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Syne_400Regular",
    color: "#9ca3af",
  },
  medium: {
    fontFamily: "Syne_500Medium",
    color: "#9ca3af",
  },
  semiBold: {
    fontFamily: "Syne_600SemiBold",
    color: "#9ca3af",
  },
  bold: {
    fontFamily: "Syne_700Bold",
    color: "#9ca3af",
  },
  extraBold: {
    fontFamily: "Syne_800ExtraBold",
    color: "#9ca3af",
  },
});

export default Text;
