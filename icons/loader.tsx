import * as React from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path, type SvgProps } from "react-native-svg";

const Loader = (props: SvgProps) => {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1_000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"],
            }),
          },
        ],
      }}
    >
      <Svg
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        {...props}
      >
        <Path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </Svg>
    </Animated.View>
  );
};
export default Loader;
