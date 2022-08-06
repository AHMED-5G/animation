import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import MedButton from "./mini/MedButton";
const Ripple = ({ style, onTap, children }) => {
  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (tabEvent) => {
        console.log(tabEvent)
    },
    onActive: () => {
      console.log("tap");
      if (onTap) runOnJS(onTap)();
    },
    onEnd: () => {},
  });
  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View style={style}>
        <View >{children}</View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
