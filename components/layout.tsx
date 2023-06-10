import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

interface Props extends SafeAreaViewProps {
  children: React.ReactNode;
  isScrollable?: boolean;
}

const Layout = ({ isScrollable, style, children, ...rest }: Props) => {
  if (isScrollable)
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={styles.contentContainer}
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
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: "#030712",
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Layout;
