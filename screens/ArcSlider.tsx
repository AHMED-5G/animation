//https://www.youtube.com/watch?v=fWLyKzEXaJI

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, width } from "../constants/dimensions";
import { circularRatio, wwrosw } from "../constants/Layout";
import {
  Canvas,
  Circle,
  Path,
  Skia,
  polar2Canvas,
  useSharedValueEffect,
  useValue,
  Rect,
} from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const ArcSlider = () => {
  const strokeWidth = wwrosw(20);
  const center = width / 2;
  const radius = (width - strokeWidth) / 2 - wwrosw(40);
  const startAngle = Math.PI;
  const endAngle = Math.PI * 2;

  const x1 = center - radius * Math.cos(startAngle);
  const y1 = -radius * Math.sin(startAngle) + center;
  const x2 = center - radius * Math.cos(endAngle);
  const y2 = -radius * Math.sin(endAngle) + center;

  const backgroundPath = `M ${x1} ${y1} A${radius} ${radius} 0 1 0 ${x2} ${y2}`;

  const foregroundPath = `M ${x2} ${y2} A${radius} ${radius} 1 0 1 ${x1} ${y1}`;

  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(backgroundPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(foregroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);

  const previousCx = useSharedValue(x2);
  const previousCy = useSharedValue(y2);

  const skiaCx = useValue(x2);
  const skiaCy = useValue(y2);

  const percentageCompleted = useSharedValue(0);
  const skiaPercentageComplete = useValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: percentageCompleted.value,
    };
  });

  if (!skiaBackgroundPath || !skiaForegroundPath) return <View />;

  const gesture = Gesture.Pan().onUpdate(
    ({ absoluteX, translationX, translationY }) => {
      const oldCanvasX = (movableCx.value = translationX + previousCx.value);
      const oldCanvasY = (movableCy.value = translationY + previousCy.value);

      const xPrime = oldCanvasX - center;
      const yPrime = -(oldCanvasY - center);

      const rawTheta = Math.atan2(yPrime, xPrime);

      let newTheta = 0;
      if (absoluteX < width / 2 && rawTheta < 0) {
        newTheta = Math.PI;
      } else if (absoluteX > width / 2 && rawTheta <= 0) {
        newTheta = 0;
      } else {
        newTheta = rawTheta;
      }

      percentageCompleted.value = 1 - newTheta / Math.PI;

      const newCoords = polar2Canvas(
        {
          theta: newTheta,
          radius,
        },
        { x: center, y: center }
      );

      movableCx.value = newCoords.x;
      movableCy.value = newCoords.y;
    }
  );

  useSharedValueEffect(
    () => {
      skiaCx.current = movableCx.value;
      skiaCy.current = movableCy.value;
      skiaPercentageComplete.current = percentageCompleted.value;
    },
    movableCx,
    movableCx,
    percentageCompleted
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Animated.Text
              style={[
                { marginTop: 40, color: "black", fontSize: 50 },
                animatedStyle,
              ]}
            >
              Opacity
            </Animated.Text>
          </View>
          <Canvas style={styles.canvas}>
            <Rect x={0} y={0} width={width} height={height} color={"black"} />
            <Path
              strokeCap={"round"}
              path={skiaBackgroundPath}
              strokeWidth={strokeWidth}
              color={"grey"}
              style={"stroke"}
            />
            <Path
              strokeCap={"round"}
              path={skiaForegroundPath}
              strokeWidth={strokeWidth}
              color={"orange"}
              style={"stroke"}
              start={0}
              end={percentageCompleted}
            />
            <Circle
              r={circularRatio(20)}
              cx={skiaCx}
              cy={skiaCy}
              color={"orange"}
            />
            <Circle
              r={circularRatio(15)}
              cx={skiaCx}
              cy={skiaCy}
              color={"white"}
            />
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ArcSlider;

const styles = StyleSheet.create({
  canvas: { height: height, width, marginTop: 20 },
});
