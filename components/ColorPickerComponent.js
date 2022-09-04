import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ColorPickerComponent = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChanged,
  pikedColor,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const limitTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PIKER_SIZE
    );
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: limitTranslateX.value },
        {
          translateY: translateY.value,
        },
        { scale: scale.value },
      ],
    };
  });
  const onEnd = useCallback(() => {
    'worklet'
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = limitTranslateX.value;

      //handled by tapGestureEvent check tapGestureEvent below 👇
      // translateY.value = withSpring(-CIRCLE_PIKER_SIZE);
      // scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd,
  });
  const rInternalPikerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );

    // pikedColor.value = backgroundColor;
    // or with worklet
    onColorChanged?.(backgroundColor);
    return {
      backgroundColor,
    };
  });
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translateY.value = withSpring(-CIRCLE_PIKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PIKER_SIZE);
    },
    onEnd,
  });
  return (
    <GestureHandlerRootView>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={{ justifyContent: "center" }}>
              <LinearGradient
                {...{ colors }}
                start={start}
                end={end}
                style={style}
              />
              <Animated.View style={[styles.piker, rStyle]}>
                <Animated.View
                  style={[styles.internalPiker, rInternalPikerStyle]}
                ></Animated.View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ColorPickerComponent;

const CIRCLE_PIKER_SIZE = 45;
const INTERNAL_PIKER_SIZE = 25;

const styles = StyleSheet.create({
  piker: {
    position: "absolute",
    backgroundColor: "white",
    width: CIRCLE_PIKER_SIZE,
    height: CIRCLE_PIKER_SIZE,
    borderRadius: CIRCLE_PIKER_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  internalPiker: {
    position: "absolute",
    // backgroundColor: "red",
    width: INTERNAL_PIKER_SIZE,
    height: INTERNAL_PIKER_SIZE,
    borderRadius: INTERNAL_PIKER_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
  },
});
