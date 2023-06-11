import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import ArrowLeft from "../icons/arrow-left";
import Layout from "../components/layout";
import Text from "../components/ui/text";

import type { TabParamList } from "./home";

type Props = BottomTabScreenProps<TabParamList, "CreateMemory">;

const CreateMemory = ({ navigation, route }: Props) => {
  return (
    <Layout>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backContainer}>
        <ArrowLeft width={16} height={16} stroke="#9ca3af" />
        <Text style={styles.backText}>go back</Text>
      </Pressable>
      <Text type="bold" style={styles.title}>
        {route.params?.id === "create" ? "post" : "edit"} your memory
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#f9fafb",
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
  },
});

export default CreateMemory;
