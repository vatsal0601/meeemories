import * as React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";

import ArrowLeft from "../icons/arrow-left";
import XCircle from "../icons/x-circle";
import Layout from "../components/layout";
import Text from "../components/ui/text";

import type { TabParamList } from "./home";

interface MemoryMediaProps {
  source: string;
  onPress: () => void;
}

const MemoryMedia = ({ source, onPress }: MemoryMediaProps) => (
  <View style={memoryMediaStyles.container}>
    <Image source={source} contentFit="cover" style={memoryMediaStyles.image} />
    <Pressable onPress={onPress} style={memoryMediaStyles.removeIcon}>
      <XCircle fill="#e5e7eb" />
    </Pressable>
  </View>
);

const memoryMediaStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    width: 24,
    height: 24,
    top: -10,
    right: -10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
});

type Props = BottomTabScreenProps<TabParamList, "CreateMemory">;

const CreateMemory = ({ navigation, route }: Props) => {
  const [description, setDescription] = React.useState("");

  return (
    <Layout isScrollable={true} contentStyle={styles.layout}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backContainer}>
        <ArrowLeft width={16} height={16} stroke="#9ca3af" />
        <Text style={styles.backText}>go back</Text>
      </Pressable>
      <Text type="bold" style={styles.title}>
        {route.params?.id ? "edit" : "post"} your memory
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="tell us what happened..."
          placeholderTextColor="#4b5563"
          onChangeText={newText => setDescription(newText)}
          multiline={true}
          autoFocus={true}
          inputMode="text"
          returnKeyType="done"
          style={styles.input}
        />
        <Pressable style={styles.mediaButtonContainer}>
          <Text type="semiBold" style={styles.mediaButtonText}>
            add media
          </Text>
        </Pressable>
        <View style={styles.mediaContainer}>
          <MemoryMedia
            source={
              "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
            }
            onPress={() => {}}
          />
          <MemoryMedia
            source={
              "https://images.unsplash.com/photo-1531845116688-48819b3b68d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
            }
            onPress={() => {}}
          />
        </View>
        <Pressable style={styles.postButtonContainer}>
          <Text type="semiBold" style={styles.postButtonText}>
            post memory
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingBottom: 32,
  },
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
  container: {
    flex: 1,
    marginTop: 24,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    color: "#e5e7eb",
    height: 300,
  },
  mediaButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  mediaButtonText: {
    fontSize: 16,
    color: "#e5e7eb",
  },
  postButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 16,
    backgroundColor: "#f9fafb",
  },
  postButtonText: {
    fontSize: 16,
    color: "#030712",
  },
  mediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});

export default CreateMemory;
