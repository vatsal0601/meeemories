import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

import type { Memory } from "../lib/api";

import EllipsisVertical from "../icons/ellipsis-vertical";

import Text from "./ui/text";

interface MediaProps {
  source: string;
  placeholder: string;
  type: "image" | "video";
}

const Media = ({ source, placeholder, type }: MediaProps) => {
  if (type === "video")
    return (
      <Video
        source={{
          uri: source,
        }}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        style={memoryMediaStyles.container}
      />
    );

  return (
    <Image
      source={source}
      placeholder={{ uri: placeholder }}
      contentFit="cover"
      style={memoryMediaStyles.container}
      transition={100}
    />
  );
};

const memoryMediaStyles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
});

interface Props extends Memory {
  shouldAddSeparator: boolean;
  onEllipsisPress: (memoryId: number | null) => void;
}

const Card = ({
  id,
  description,
  shouldAddSeparator,
  media,
  onEllipsisPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={4}
          >
            {description}
          </Text>
        </View>
        <Pressable
          onPress={() => onEllipsisPress(id)}
          style={styles.ellipsisContainer}
        >
          <EllipsisVertical stroke="#9ca3af" />
        </Pressable>
      </View>
      {media && media.length > 0 && (
        <View style={styles.mediaContainer}>
          <FlashList
            data={media}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <Media
                source={item.url}
                type={item.type}
                placeholder={item.placeholder}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.horizontalListSeparator} />
            )}
            ListFooterComponent={() => (
              <View style={styles.horizontalListSeparator} />
            )}
            horizontal={true}
            estimatedItemSize={10}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode="never"
          />
        </View>
      )}
      {shouldAddSeparator ? (
        <View style={styles.separator} />
      ) : (
        <View style={styles.spaceSeparator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 36.5,
    borderLeftWidth: 2,
    borderLeftColor: "#9ca3af",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#4b5563",
    margin: 16,
  },
  spaceSeparator: {
    height: 16,
  },
  mediaContainer: {
    minHeight: 50,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  horizontalListSeparator: {
    width: 16,
  },
  ellipsisContainer: {
    width: 24,
    height: 24,
  },
});

export default Card;
