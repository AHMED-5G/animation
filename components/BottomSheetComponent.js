import { StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { height } from "../constants/dimensions";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const BottomSheetComponent = React.forwardRef(({}, ref) => {
  const scrollTo = useCallback((destination) => {
    "worklet";
    console.log("scroll tooo");
    //   translateY.value = withSpring(destination, { damping: 50 });
  }, []);
  useImperativeHandle(
    ref,
    () => {
      {
        scrollTo;
        
      }
    },
    [scrollTo]
  );

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const MAX_TRANSLATE_Y = -height + 100;

  const gesture = Gesture.Pan()

    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height / 3) {
        // scrollTo(0);
        translateY.value = withSpring(0, { damping: 50 });
      } else if (translateY.value < -height / 2) {
        // scrollTo(MAX_TRANSLATE_Y);
        translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 0],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    translateY.value = withSpring(-height / 3, { damping: 50 });
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line}></View>
      </Animated.View>
    </GestureDetector>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: height,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: height - 100,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
