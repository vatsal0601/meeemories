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
    fontFamily: "Nunito_400Regular",
    color: "#9ca3af",
  },
  medium: {
    fontFamily: "Nunito_500Medium",
    color: "#9ca3af",
  },
  semiBold: {
    fontFamily: "Nunito_600SemiBold",
    color: "#9ca3af",
  },
  bold: {
    fontFamily: "Nunito_700Bold",
    color: "#9ca3af",
  },
  extraBold: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#9ca3af",
  },
});

export default Text;
