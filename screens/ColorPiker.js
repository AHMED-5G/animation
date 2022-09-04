import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import ColorPickerComponent from "../components/ColorPickerComponent";
import { width } from "../constants/dimensions";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const PIKER_WIDTH = 0.9 * width;
const CIRCLE_SIZE = 0.8 * width;

const ColorPiker = () => {
  const COLORS = [
    "red",
    "purple",
    "blue",
    "cyan",
    "green",
    "yellow",
    "orange",
    "black",
    "white",
  ];
  const pikedColor = useSharedValue(COLORS[0]);
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pikedColor.value,
    };
  });
  const onColorChanged = useCallback((color) => {
    'worklet'
    pikedColor.value = color;
  }, []);
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]}></Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <ColorPickerComponent
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PIKER_WIDTH}
          onColorChanged={onColorChanged}
          pikedColor={pikedColor}
        />
      </View>
    </>
  );
};
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

export default ColorPiker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: { height: 50, width: PIKER_WIDTH, borderRadius: 20 },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: "red",
    borderRadius: CIRCLE_SIZE / 2,
  },
});
