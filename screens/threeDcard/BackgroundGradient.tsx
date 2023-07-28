import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  width: number;
  height: number;
};

const BackgroundGradient = ({ width, height }: Props) => {
  const canvasPadding = 40;
  const rValue = useSharedValue(0);
  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, { duration: 2000 }), -1, true);
  }, [rValue]);

  return (
    <Canvas
      style={{ width: width + canvasPadding, height: height + canvasPadding }}
    >
      <RoundedRect
        x={canvasPadding / 2}
        y={canvasPadding / 2}
        width={width}
        height={height}
        color={"white"}
        r={20}
      >
        <SweepGradient
          colors={["cyan", "magenta", "yellow", "cyan"]}
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
        />
        <BlurMask blur={rValue} style={"solid"} />
      </RoundedRect>
    </Canvas>
  );
};

export default BackgroundGradient;

const styles = StyleSheet.create({});
