//https://www.youtube.com/watch?v=Fd5FWxx7c48

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Page from "../components/Page";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { width } from "../constants/dimensions";

const ScrollViewFromScratch = () => {
  const titles = ["whats", "up", "mobile", "dev"];
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    const maxTranslateX = -width * (titles.length - 1);
    return Math.max(Math.min(translateX.value, 0), maxTranslateX);
  });
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
      });
    },
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler style={{ flex: 1 }} onGestureEvent={panGestureHandler}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                index={index}
                title={title}
                translateX={clampedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ScrollViewFromScratch;

const styles = StyleSheet.create({});
