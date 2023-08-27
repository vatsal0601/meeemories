import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";

import XCircle from "../icons/x-circle";

interface Props {
  source: string;
  type: "image" | "video";
  onPress: () => void;
}

const CreateMemoryMedia = ({ source, type, onPress }: Props) => (
  <View style={styles.container}>
    {type === "video" ? (
      <Video
        source={{
          uri: source,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        style={styles.image}
      />
    ) : (
      <Image source={source} contentFit="cover" style={styles.image} />
    )}
    <Pressable onPress={onPress} style={styles.removeIcon}>
      <XCircle fill="#e5e7eb" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
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

export default CreateMemoryMedia;
