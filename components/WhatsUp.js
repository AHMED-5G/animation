import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { width, height } from "../constants/dimensions";

const SIZE = width * 0.7;
const WhatsUp = ({ index, title, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      //if translateX.value !==(index - 1) * width  prevent output 0 going to -1 or 1
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale }],
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-height / 2, 0, height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      key={index.toString()}
      style={[
        styles.screen,
        { backgroundColor: `rgba(0,0,246,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}>
        <Animated.View style={[rTextStyle, { position: "absolute" }]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default WhatsUp;

const styles = StyleSheet.create({
  screen: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256, .4)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "800",
  },
});
