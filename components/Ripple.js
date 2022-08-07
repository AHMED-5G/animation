import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedRef,
  measure,
} from "react-native-reanimated";
import { myColors } from "../constants/colors";

const Ripple = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  let width = useSharedValue(0);
  let height = useSharedValue(0);
  const scale = useSharedValue(0);
  const aRef = useAnimatedRef();
  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (tapEvent) => {
      const layout = measure(aRef);
      width.value = layout.width;
      height.value = layout.height;
      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;
      scale.value = 0;
      rippleOpacity.value = 1;
      scale.value = withTiming(1, {
        duration: 1000,
      });
    },
    onActive: () => {
      if (onTap) runOnJS(onTap)();
    },
    onFinish: () => {
      rippleOpacity.value = withTiming(0);
    },
  });
  const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
  const rStyle = useAnimatedStyle(() => {
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      top: 0,
      left: 0,
      backgroundColor: myColors.grey2,
      position: "absolute",
      transform: [
        {
          translateX: centerX.value - circleRadius,
        },
        {
          translateY: centerY.value - circleRadius,
        },
        { scale: scale.value },
      ],
    };
  });
  return (
    <View>
      <TapGestureHandler onGestureEvent={tapGestureEvent} ref={aRef}>
        <Animated.View style={[style, { overflow: "hidden" }]}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
