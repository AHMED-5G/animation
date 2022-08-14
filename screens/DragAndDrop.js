import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import LightHeader from "../components/mini/LightHeader";
import { width } from "../constants/dimensions";

const DragAndDrop = () => {
  const size = 100;

  const l1translateX = useSharedValue(0);
  const l1translateY = useSharedValue(0);
  const l1left = useSharedValue(10);
  const l1top = useSharedValue(120);
  const l2left = useSharedValue(10);
  const l2top = useSharedValue(240);
  const l2translateX = useSharedValue(0);
  const l2translateY = useSharedValue(0);
  const rightAnswer = useSharedValue("green");

  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);

  const r1Expecting = "l2";
  const r2Expecting = "l1";
  const [r1Answer, setR1Answer] = useState();
  const [r2Answer, setR2Answer] = useState();
  const [movingTarget, setMovingTarget] = useState(0);
  const l1PanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = l2translateX.value;
      context.translateY = l2translateY.value;
      runOnJS(setMovingTarget)("l1");
    },

    onActive: (event, context) => {
      l1translateX.value = event.translationX + context.translateX;
      l1translateY.value = event.translationY + context.translateY;
      if (event.absoluteX > width / 2) {
        if (event.absoluteY < 120 + size / 2) {
          runOnJS(setR1Answer)("l1");
          runOnJS(setR2Answer)(0);
        } else if (
          event.absoluteY < 240 + size / 2 &&
          event.absoluteY > 120 + size / 2
        ) {
          runOnJS(setR2Answer)("l1");
          runOnJS(setR1Answer)(0);
        }
      }
    },

    onEnd: (event) => {
      if (event.absoluteX > width / 2) {
        l1translateX.value = withSpring(0);
        l1translateY.value = withSpring(0);
        l1left.value = withSpring(width - size - 10);
        if (event.absoluteY < 120 + size / 2 && !r1) {
          l1top.value = withSpring(120);
          runOnJS(setR1)(movingTarget);
        } else if (
          event.absoluteY < 240 + size / 2 &&
          event.absoluteY > 120 + size / 2 &&
          !r2
        ) {
          l1top.value = withSpring(240);
          runOnJS(setR2)(movingTarget);
        } else {
          l1left.value = 10;
          l1top.value = 120;
        }
      } else {
        l1translateX.value = withSpring(0);
        l1translateY.value = withSpring(0);
      }
      //   runOnJS(setMovingTarget)(0);
    },
  });

  const l2PanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = l2translateX.value;
      context.translateY = l2translateY.value;
      runOnJS(setMovingTarget)("l2");
    },
    onActive: (event, context) => {
      l2translateX.value = event.translationX + context.translateX;
      l2translateY.value = event.translationY + context.translateY;
      if (event.absoluteX > width / 2) {
        if (event.absoluteY < 120 + size / 2) {
          runOnJS(setR1Answer)("l2");
          runOnJS(setR2Answer)(0);
        } else if (
          event.absoluteY < 240 + size / 2 &&
          event.absoluteY > 120 + size / 2
        ) {
          runOnJS(setR2Answer)("l2");
          runOnJS(setR1Answer)(0);
        }
      }
    },
    onEnd: (event) => {
      if (event.absoluteX > width / 2) {
        l2translateX.value = withSpring(0);
        l2translateY.value = withSpring(0);
        l2left.value = withSpring(width - size - 10);
        if (event.absoluteY < 120 + size / 2 && !r1) {
          l2top.value = withSpring(120);
          runOnJS(setR1)(movingTarget);
        } else if (
          event.absoluteY < 240 + size / 2 &&
          event.absoluteY > 120 + size / 2 &&
          !r2
        ) {
          l2top.value = withSpring(240);
          runOnJS(setR2)(movingTarget);
        } else {
          l2left.value = withSpring(10);
          l2top.value = withSpring(240);
        }
      } else {
        l2translateX.value = withSpring(0);
        l2translateY.value = withSpring(0);
      }
    },
  });

  const l1Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: l1translateX.value },
        {
          translateY: l1translateY.value,
        },
      ],
      left: l1left.value,
      top: l1top.value,
    };
  });

  const l2Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: l2translateX.value },
        {
          translateY: l2translateY.value,
        },
      ],
      left: l2left.value,
      top: l2top.value,
    };
  });

  const hintStyle = useAnimatedStyle(() => {
    return {
      borderColor: "red",
      borderWidth: 2,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <LightHeader back />
      <GestureHandlerRootView
        style={{
          // flex: 1,
          height: 400,
        }}
      >
        <PanGestureHandler onGestureEvent={l1PanGestureEvent}>
          <Animated.View
            style={[
              {
                width: size,
                height: size,
                backgroundColor: "rgba(0,0,256, .5)",
                borderRadius: 100,
                position: "absolute",
                left: 20,
                top: 120,
                zIndex: 1,
              },
              l1Style,
            ]}
          />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={l2PanGestureEvent}>
          <Animated.View
            style={[
              {
                width: size,
                height: size,
                backgroundColor: "red",
                borderRadius: 20,
                position: "absolute",
                zIndex: 1,
              },
              l2Style,
            ]}
          />
        </PanGestureHandler>
      </GestureHandlerRootView>
      <View
        style={{
          flexDirection: "column",
          width: size,
          height: size,
          borderRadius: 20,
          position: "absolute",
          borderWidth: r1Answer == r1Expecting ? 2 : 1,
          borderColor: r1Answer == r1Expecting ? "green" : "black",
          right: 10,
          top: 120,
          zIndex: 2,
        }}
      >
        <Text>{r1}</Text>
      </View>
      <View
        style={[
          {
            flexDirection: "column",
            width: size,
            height: size,
            borderRadius: 100,
            position: "absolute",
            borderWidth: r2Answer == r2Expecting ? 2 : 1,
            borderColor: r2Answer == r2Expecting ? "green" : "black",
            right: 10,
            top: 240,
            zIndex: 2,
          },
        ]}
      >
        <Text>{r2}</Text>
      </View>
      <View style={{ marginTop: 20, marginLeft: 10 }}>
        <Text>r1 answer: {r1Answer}</Text>
        <Text>
          r2 answer : {r2Answer} {r2Expecting}
        </Text>
      </View>
    </View>
  );
};

export default DragAndDrop;

const styles = StyleSheet.create({});
