import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

import PlusIcon from "../icons/plus";

const CreateMemoryButton = ({ style, ...rest }: BottomTabBarButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable style={[styles.container, { bottom: insets.bottom }]} {...rest}>
      <PlusIcon width={40} height={40} stroke="#9ca3af" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: 32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#030712",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateMemoryButton;
