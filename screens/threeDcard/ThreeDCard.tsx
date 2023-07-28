//https://www.youtube.com/watch?v=pVesCl7TY8A
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundGradient from "./BackgroundGradient";
import { height, width } from "../../constants/dimensions";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type Props = {};

const CARD_HEIGHT = 256;
const CARD_WIDTH = width * 0.9;
const ThreeDCard = (props: Props) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const handler = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP)
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP)
      );
    })
    .onChange((event) => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateXValue = `${rotateX.value}deg`;
    const rotateYValue = `${rotateY.value}deg`;
    return {
      transform: [
        { perspective: 300 },
        { rotateX: rotateXValue },
        { rotateY: rotateYValue },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <BackgroundGradient width={CARD_WIDTH} height={CARD_HEIGHT} />
      <GestureDetector gesture={handler}>
        <Animated.View
          style={[
            {
              width: CARD_WIDTH - 5,
              height: CARD_HEIGHT - 5,
              backgroundColor: "black",
              position: "absolute",
              borderRadius: 20,
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              position: "absolute",

              right: "10%",
              bottom: "10%",
            }}
          >
            <View
              style={{
                height: 50,
                aspectRatio: 1,
                borderRadius: 25,
                backgroundColor: "#272F46",
              }}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThreeDCard />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
