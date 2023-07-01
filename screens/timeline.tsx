import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { useAuth } from "@clerk/clerk-expo";

import Layout from "../components/layout";
import Text from "../components/ui/text";

const Timeline = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { getToken } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();

  React.useEffect(() => {
    const init = async () => {
      // Get the user's Clerk JWT token
    };

    init();
  }, []);

  return (
    <Layout>
      <Text type="bold" style={styles.title}>
        timeline of your
      </Text>
      <View style={styles.titleContainer}>
        <Text type="bold" style={styles.title}>
          memories
        </Text>
        <Image
          source={require("../assets/only-icon.png")}
          contentFit="contain"
          style={styles.image}
        />
      </View>
      <Text type="bold" style={styles.title}>
        {isLoading ? "Loading..." : "Done"}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    color: "#f9fafb",
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default Timeline;
