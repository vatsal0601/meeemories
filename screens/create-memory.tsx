import * as React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

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
  const [media, setMedia] = React.useState<ImagePicker.ImagePickerAsset[]>([]);

  const handleMediaButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) setMedia(result.assets);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Pressable
          onPress={handleMediaButton}
          style={styles.mediaButtonContainer}>
          <Text type="semiBold" style={styles.mediaButtonText}>
            add media
          </Text>
        </Pressable>
        {media.length > 0 ? (
          <View style={styles.mediaContainer}>
            {media.map((item, index) => (
              <MemoryMedia
                key={index}
                source={item.uri}
                onPress={() => {
                  const newMedia = [...media];
                  newMedia.splice(index, 1);
                  setMedia(newMedia);
                }}
              />
            ))}
          </View>
        ) : null}
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
