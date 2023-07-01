import * as React from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

interface Props extends SafeAreaViewProps {
  children: React.ReactNode;
  isScrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

const Layout = ({
  isScrollable,
  style,
  contentStyle,
  children,
  ...rest
}: Props) => {
  if (isScrollable)
    return (
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentStyle]}
        {...rest}>
        <SafeAreaView>{children}</SafeAreaView>
      </ScrollView>
    );

  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#030712",
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Layout;
