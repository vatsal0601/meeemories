import * as React from "react";
import { StyleSheet } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useData } from "../contexts/DataContext";

import Layout from "../components/layout";
import Text from "../components/ui/text";

const Timeline = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { tabBarHeight: dataTabBarHeight, setTabBarHeight } = useData();
  const tabBarHeight = useBottomTabBarHeight();

  React.useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      if (dataTabBarHeight === null || dataTabBarHeight === 0)
        setTabBarHeight(tabBarHeight);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <Layout>
      <Text type="bold" style={styles.title}>
        timeline of your memories
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#f9fafb",
  },
});

export default Timeline;
