import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { useData } from "../contexts/DataContext";

import PlusIcon from "../icons/plus";

import type { RootStackParamList } from "../App";

type CreateMemoryButtonNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const CreateMemoryButton = () => {
  const { tabBarHeight } = useData();
  const navigation = useNavigation<CreateMemoryButtonNavigationProp>();
  const state = useNavigationState(state => state);

  if (tabBarHeight === null || tabBarHeight === 0) return null;

  if (state?.routes[state?.index]?.name === "CreateMemory") return null;

  const onPress = () => {
    navigation.navigate("CreateMemory", { mode: "create" });
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { bottom: tabBarHeight }]}>
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
