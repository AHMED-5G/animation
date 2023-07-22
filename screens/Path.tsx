import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { width, height } from "../constants/dimensions";
import DrawComponent from "../components/DrawComponent";
import Svg, { Path, Rect } from "react-native-svg";
import { interpolatePath, parse } from "react-native-redash";
export default () => {
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49
  //stop working after expo 49

  const boxHeight = 200;
  const boxWidth = width - 10;

  const start = `10 , ${10}`;
  const controlPointA = `${20} ${20}`;
  const controlPointB = `${30} ${30}`;
  const end = `${40} ${40}`;
  const pathTop = boxHeight / 2;
  const pathWidth = width - 40;
  const pathHeight = 10;
  const pushFromTop = 100;
  const pushFromDown = 10;
  const rateXValue = useSharedValue(0);
  const rateYValue = useSharedValue(0);
  const changePathProgress = useSharedValue(0);
  useEffect(() => {
    runMyRate();
  }, []);

  let index = 0;
  function runMyRate() {
    console.log("DrawRate.tsx -> runMyRate -> ");
    // changePathProgress.value = withTiming(1, { duration: 500 });

    if (index < 50) {
      index++;

      rateXValue.value = rateXValue.value + 1;
      // // rateYValue.value = rateYValue.value + 10;
      // setTimeout(() => runMyRate(), 1000);
    }
  }
  const firstPath = parse(`M 10 80 Q 195 10 180 80`);
  const secondPath = parse(`M 10 80 Q 95 10 100 80`);

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const animatedProps = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        changePathProgress.value,
        [0, 1],
        [secondPath, firstPath]
      ),
      opacity: interpolate(changePathProgress.value, [0, 1], [0, 1]),
      fill: interpolateColor(
        changePathProgress.value,
        [0, 1],
        ["yellow", "orange"]
      ),
    };
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEE",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Svg
        width={width - 10}
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        height={200}
      >
        <AnimatedPath
          stroke={"black"}
          fill={"yellow"}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  ss: {
    backgroundColor: "red",
  },
});
