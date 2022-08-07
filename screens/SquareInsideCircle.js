//https://www.youtube.com/watch?v=4HUreYYoE6U

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { myColors } from "../constants/colors";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import LightHeader from "../components/mini/LightHeader";
import EmptyHeader from "../components/mini/EmptyHeader";
const SquareInsideCircle = () => {
  const size = 100;
  const radius = size * 1.5;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < radius + size / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <LightHeader back />
      <GestureHandlerRootView
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: radius * 2,
            height: radius * 2,
            // backgroundColor: "red",
            borderRadius: radius,
            borderWidth: 5,
            borderRightColor: "rgba(0,0,256, .5)",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              style={[
                {
                  flexDirection: "column",
                  width: size,
                  height: size,
                  backgroundColor: "rgba(0,0,256, .5)",
                  borderRadius: 20,
                },
                rStyle,
              ]}
            />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

export default SquareInsideCircle;

const styles = StyleSheet.create({});
