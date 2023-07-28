//https://shopify.github.io/react-native-skia/docs/group

import { Button, StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Canvas,
  Circle,
  Fill,
  Group,
  LinearGradient,
  Paint,
  RoundedRect,
  Skia,
  SweepGradient,
  mix,
  rect,
  useCanvasRef,
  useSharedValueEffect,
  useTiming,
  useValue,
  vec,
  Image,
  useImage,
  rrect,
  Blur,
  ColorMatrix,
  FitBox,
  Path,
  Rect,
  DiffRect,
  Line,
  Points,
  Oval,
  ImageShader,
  Vertices,
  Patch,
  Drawing,
  ImageSVG,
  fitbox,
  Glyphs,
  TextPath,
  Shader,
  TwoPointConicalGradient,
  Shadow,
  Text,
  RuntimeShader,
  useClockValue,
  useComputedValue,
  useLoop,
  Selector,
  useValueEffect,
  interpolate,
  useSpring,
  runSpring,
  useTouchHandler,
} from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { width, height } from "../constants/dimensions";
import type { ReactNode } from "react";
import { useContext, createContext } from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
const SkiaPlayGround = () => {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withTiming(1, {
      duration: 1000,
    });
  }, []);
  const cx = useValue(100);
  const cy = useValue(100);
 
  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
    },
  });
  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Circle cx={cx} cy={cy} r={10} color="red" />
    </Canvas>
  );
};

export default SkiaPlayGround;

const styles = StyleSheet.create({});
