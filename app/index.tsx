import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router, Stack, useFocusEffect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import isBoolean from "lodash/isBoolean";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";

import { useWarmUpBrowser } from "../hooks/use-warm-up-browser";

import ArrowRight from "../icons/arrow-right";
import Text from "../components/ui/text";

WebBrowser.maybeCompleteAuthSession();

const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isSignedIn } = useAuth();

  useFocusEffect(() => {
    if (isBoolean(isSignedIn) && isSignedIn)
      setTimeout(() => router.replace("/timeline"));
  });

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow({});

      if (!isEmpty(createdSessionId) && isFunction(setActive))
        setActive({ session: createdSessionId });

      setIsLoading(false);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "register",
        }}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text type="bold" style={styles.heading}>
            welcome to{" "}
            <Text type="bold" style={styles.meeemories}>
              meeemories!
            </Text>
          </Text>
          <Text style={styles.subText}>
            relive your cherished moments, one notification at a time. sign up
            or log in using your google account to embark on a journey down
            memory lane!
          </Text>
        </View>
        <Pressable
          onPress={onPress}
          disabled={isLoading}
          style={[styles.buttonContainer, isLoading && { opacity: 0.5 }]}
        >
          <Text type="semiBold" style={styles.buttonText}>
            {isLoading ? "starting..." : "lets get started!"}
          </Text>
          <ArrowRight stroke="#030712" strokeWidth={2} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    paddingHorizontal: 24,
    backgroundColor: "#030712",
    justifyContent: "space-between",
  },
  topContainer: {
    gap: 16,
  },
  heading: {
    fontSize: 40,
    color: "#f9fafb",
  },
  meeemories: { color: "#fbbf24" },
  subText: {
    fontSize: 20,
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

export default Register;
