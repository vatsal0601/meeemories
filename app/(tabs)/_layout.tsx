import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Stack, Tabs } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import MapIcon from "../../icons/map";
import UserIcon from "../../icons/user";
import CreateMemoryButton from "../../components/create-memory-button";
import Header from "../../components/header";
import TabIcon from "../../components/tab-icon";

const Home = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheetModalProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Tabs
        screenOptions={{
          header: (props) => <Header {...props} />,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabContainer,
            Platform.OS === "ios" && bottom > 0 && { paddingTop: bottom / 2 },
            { paddingBottom: bottom },
          ],
        }}
      >
        <Tabs.Screen
          name="timeline"
          options={{
            tabBarIcon: (props) => (
              <TabIcon
                focused={props.focused}
                size={props.size}
                icon={MapIcon}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create-memory"
          options={{
            tabBarButton: (props) => <CreateMemoryButton {...props} />,
          }}
          listeners={() => ({
            tabPress: (e: any) => {
              e.preventDefault();
              router.push("/create-memory-modal");
            },
          })}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: (props) => (
              <TabIcon
                focused={props.focused}
                size={props.size}
                icon={UserIcon}
              />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    backgroundColor: "#030712",
    borderTopColor: "#1f2937",
    elevation: 0,
    zIndex: 1,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
