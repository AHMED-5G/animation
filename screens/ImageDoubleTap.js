import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { height, width } from "../constants/dimensions";

const ImageDoubleTap = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const imageUrl =
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  }));

  const focalPointStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  }));
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={{ flex: 1 }}>
          <AnimatedImage
            source={{ uri: imageUrl }}
            style={[{ flex: 1 }, rStyle]}
          />
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: 20,
                height: 20,
                backgroundColor: "blue",
                borderRadius: 10,
              },
              focalPointStyle,
            ]}
          />
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ImageDoubleTap;

const styles = StyleSheet.create({});
