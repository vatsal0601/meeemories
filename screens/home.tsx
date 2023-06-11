import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapIcon from "../icons/map";
import UserIcon from "../icons/user";
import CreateMemoryButton from "../components/create-memory-button";
import TabIcon from "../components/tab-icon";

import CreateMemory from "./create-memory";
import Profile from "./profile";
import Timeline from "./timeline";

export type TabParamList = {
  Timeline: undefined;
  Profile: undefined;
  CreateMemory: { id?: string };
};

const Tab = createBottomTabNavigator<TabParamList>();

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "android" && { height: 64 },
          Platform.OS === "ios" && { paddingTop: 16 },
          { paddingBottom: insets.bottom },
        ],
      }}>
      <Tab.Screen
        name="Timeline"
        component={Timeline}
        options={{
          tabBarIcon: props => (
            <TabIcon focused={props.focused} size={props.size} icon={MapIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateMemory"
        component={CreateMemory}
        options={{
          tabBarButton: props => <CreateMemoryButton {...props} />,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => (
            <TabIcon
              focused={props.focused}
              size={props.size}
              icon={UserIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
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
  },
});

export default Home;
