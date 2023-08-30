import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import * as Device from "expo-device";
import { Image } from "expo-image";
import isString from "lodash/isString";

import { hasNotchOrDynamicIsland } from "../lib/util";

import Text from "./ui/text";

const Header = (props: NativeStackHeaderProps | BottomTabHeaderProps) => {
  const {
    options: { headerTitle },
  } = props;

  if (!isString(headerTitle)) return null;

  if (headerTitle === "register") return null;

  const deviceName = Device.deviceName ?? "";

  const iosStyles = hasNotchOrDynamicIsland(deviceName)
    ? { paddingBottom: -16 }
    : { paddingVertical: 16 };

  const platformStyles = Platform.select({
    ios: iosStyles,
    android: {
      paddingVertical: 16,
    },
  });

  if (headerTitle === "timeline")
    return (
      <SafeAreaView style={[styles.titleContainer, platformStyles]}>
        <Text type="bold" style={styles.title}>
          meeemories
        </Text>
        <Image
          source={require("../assets/only-icon.png")}
          contentFit="contain"
          style={styles.image}
        />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[styles.titleContainer, platformStyles]}>
      <Text type="bold" style={styles.title}>
        {headerTitle}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#030712",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  title: {
    fontSize: 24,
    color: "#f9fafb",
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default Header;
