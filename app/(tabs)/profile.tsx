import * as React from "react";
import { Platform, Pressable, StyleSheet, Switch, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import isNil from "lodash/isNil";

import Text from "../../components/ui/text";

interface SettingProps {
  id: string;
  text: string;
}

const Setting = ({ id, text }: SettingProps) => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const props = Platform.select({
    ios: {
      ios_backgroundColor: "#1f2937",
      trackColor: { false: "#1f2937", true: "#fbbf24" },
      thumbColor: "#e5e7eb",
    },
    android: {
      trackColor: { false: "#1f2937", true: "#fbbf24" },
      thumbColor: "#e5e7eb",
    },
  });

  return (
    <View style={settingStyles.container}>
      <Text style={settingStyles.text}>{text}</Text>
      <Switch
        value={isEnabled}
        onChange={() => setIsEnabled((isEnabled) => !isEnabled)}
        style={[
          settingStyles.switch,
          Platform.OS === "ios" && {
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
          },
        ]}
        {...props}
      />
    </View>
  );
};

const settingStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  switch: {
    borderWidth: 0,
    borderColor: "transparent",
  },
});

const Profile = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useUser();
  const { signOut } = useAuth();

  if (isNil(user)) return null;

  const height = useBottomTabBarHeight();

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "profile",
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { marginBottom: height + 32 },
        ]}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.settingsContainer}>
          <View style={styles.userContainer}>
            <Image
              source={user.imageUrl}
              contentFit="cover"
              style={styles.image}
            />
            <View style={styles.nameContainer}>
              <Text type="bold" style={styles.name}>
                {user.fullName}
              </Text>
              <Text style={styles.email}>
                {user.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>
          <View style={styles.notificationContainer}>
            <Text type="semiBold" style={styles.settingsTitle}>
              notification settings
            </Text>
            <View style={styles.notificationSettingsContainer}>
              <Setting id="1" text="enable notifications" />
              <Setting id="2" text="asdasd" />
            </View>
          </View>
        </View>
        <Pressable
          onPress={handleLogout}
          disabled={isLoading}
          style={[styles.buttonContainer, isLoading && { opacity: 0.5 }]}
        >
          <Text type="semiBold" style={styles.buttonText}>
            {isLoading ? "logging out" : "logout"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: "#030712",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  settingsContainer: {
    gap: 32,
  },
  userContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameContainer: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#f9fafb",
  },
  name: {
    fontSize: 24,
    color: "#fbbf24",
  },
  email: {
    fontSize: 16,
  },
  notificationContainer: {
    gap: 24,
  },
  notificationSettingsContainer: {
    gap: 16,
  },
  settingsTitle: {
    fontSize: 20,
    color: "#f9fafb",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 16,
    backgroundColor: "#f9fafb",
  },
  buttonText: {
    fontSize: 20,
    color: "#030712",
  },
});

export default Profile;
