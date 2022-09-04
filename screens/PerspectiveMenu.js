import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { width } from "../constants/dimensions";
import { Entypo } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const PerspectiveMenu = () => {
  const translateX = useSharedValue(0);
  const THRESHOLD = width / 3;
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(width / 2);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 3],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 15],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: -rotate + "deg" },
      ],
    };
  });
  const onPress = () => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(width / 2);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View
            style={[{ backgroundColor: "white", flex: 1 }, rStyle]}
          >
            <Entypo
              style={{ marginTop: 10 }}
              name="menu"
              size={32}
              color="black"
              onPress={onPress}
            />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default PerspectiveMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e23",
  },
});
