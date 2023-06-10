import * as React from "react";
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
      {isLoading ? <Text>Loading...</Text> : <Text>Timeline</Text>}
    </Layout>
  );
};

export default Timeline;
