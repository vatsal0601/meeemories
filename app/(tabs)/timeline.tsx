import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { router, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import type { AxiosError } from "axios";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isEmpty from "lodash/isEmpty";
import keys from "lodash/keys";

import { getMemories, type GetMemoriesResponse } from "../../lib/api";

import Clock from "../../icons/clock";
import Plus from "../../icons/plus";
import Card from "../../components/card";
import EditDeleteBottomSheet from "../../components/edit-delete-bottom-sheet";
import Text from "../../components/ui/text";

interface SectionHeaderProps {
  title: string;
  index?: number;
}

const SectionHeader = ({ title, index = -1 }: SectionHeaderProps) => {
  const date = new Date(title);
  const formattedTitle = isValid(date)
    ? format(new Date(title), "MMMM do, yyyy")
    : title;

  return (
    <View
      style={[sectionHeaderStyles.container, index === 0 && { marginTop: 0 }]}
    >
      <View style={sectionHeaderStyles.leftContainer}>
        <Clock width={28} height={28} fill="#9ca3af" />
        <Text type="semiBold" style={sectionHeaderStyles.title}>
          {formattedTitle}
        </Text>
      </View>
    </View>
  );
};

const sectionHeaderStyles = StyleSheet.create({
  container: {
    marginVertical: -4,
    marginHorizontal: 24,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    color: "#f9fafb",
    textTransform: "lowercase",
  },
  ellipsisContainer: {
    width: 24,
    height: 24,
  },
});

const Timeline = () => {
  const { getToken } = useAuth();
  const memoriesQuery = useQuery<GetMemoriesResponse, AxiosError>(
    "memories",
    () => getMemories(getToken)
  );

  const tabBarHeight = useBottomTabBarHeight();

  const [selectedMemoryId, setSelectedMemoryId] = React.useState<number | null>(
    null
  );

  const handleSelectedMemoryIdChange = React.useCallback(
    (memoryId: number | null) => {
      setSelectedMemoryId(memoryId);
    },
    []
  );

  if (memoriesQuery.isSuccess) {
    const { data } = memoriesQuery;

    if (isEmpty(data)) {
      return (
        <>
          <Tabs.Screen
            options={{
              headerTitle: "timeline",
            }}
          />
          <SafeAreaView
            style={[styles.container, styles.wrapper, styles.horizontalSpacing]}
          >
            <Image
              source={require("../../assets/empty-timeline.png")}
              style={styles.emptyTimelineImage}
            />
            <View style={styles.emptyTextContainer}>
              <Text type="bold" style={styles.title}>
                start capturing moments
              </Text>
              <Text style={styles.subText}>
                start building your collection of special moments to treasure in
                meeemories
              </Text>
              <Pressable
                onPress={() => router.push("/create-memory-modal")}
                style={styles.buttonContainer}
              >
                <Plus stroke="#030712" strokeWidth={2} />
                <Text type="semiBold" style={styles.buttonText}>
                  create memory
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </>
      );
    }

    const dates = keys(data);
    return (
      <>
        <Tabs.Screen
          options={{
            headerTitle: "timeline",
          }}
        />
        <EditDeleteBottomSheet
          selectedMemoryId={selectedMemoryId}
          setSelectedMemoryId={setSelectedMemoryId}
        />
        <View style={[styles.container, styles.wrapper]}>
          <FlashList
            data={dates}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.container}>
                <SectionHeader title={item} index={index} />
                <FlashList
                  data={data[item]}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item: innerItem, index: innerIndex }) => (
                    <Card
                      shouldAddSeparator={innerIndex !== data[item].length - 1}
                      onEllipsisPress={handleSelectedMemoryIdChange}
                      {...innerItem}
                    />
                  )}
                  estimatedItemSize={10}
                  alwaysBounceHorizontal={false}
                  alwaysBounceVertical={false}
                  bounces={false}
                  overScrollMode="never"
                />
              </View>
            )}
            ListHeaderComponent={<View style={{ height: 24 }} />}
            ListFooterComponent={
              <View>
                <SectionHeader title={"more memories await you!"} />
                <View style={{ height: tabBarHeight + 64 }} />
              </View>
            }
            ListFooterComponentStyle={styles.timelineFooterComponentStyle}
            estimatedItemSize={10}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode="never"
          />
        </View>
      </>
    );
  }

  if (memoriesQuery.isError)
    return (
      <>
        <Tabs.Screen
          options={{
            headerTitle: "timeline",
          }}
        />
        <SafeAreaView
          style={[styles.container, styles.wrapper, styles.horizontalSpacing]}
        >
          <Text type="bold" style={styles.title}>
            Someting went wrong :(
          </Text>
          <Text style={styles.subText}>({memoriesQuery.error.message})</Text>
        </SafeAreaView>
      </>
    );

  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: "timeline",
        }}
      />
      <SafeAreaView
        style={[styles.container, styles.wrapper, styles.horizontalSpacing]}
      >
        <Text type="bold" style={styles.title}>
          fetching memories...
        </Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#f9fafb",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    minHeight: 100,
  },
  timelineFooterComponentStyle: {
    marginTop: -12,
  },
  wrapper: {
    backgroundColor: "#030712",
  },
  horizontalSpacing: {
    paddingHorizontal: 24,
  },
  emptyTimelineImage: {
    width: "100%",
    height: 300,
  },
  emptyTextContainer: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
    backgroundColor: "#f9fafb",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "#030712",
  },
});

export default Timeline;
