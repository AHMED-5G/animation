//https://shopify.github.io/react-native-skia/docs/group

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
} from "@shopify/react-native-skia";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { width, height } from "../constants/dimensions";
import type { ReactNode } from "react";
import { useContext, createContext } from "react";

const SkiaPlayGround = () => {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withTiming(1, {
      duration: 1000,
    });
  }, []);
  const svg = Skia.SVG.MakeFromString(
    `<svg viewBox='0 0 20 20' width="20" height="20" xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='10' fill='#00ffff'/>
    </svg>`
  )!;
   
  const width = 256;
  const height = 256;
  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, width, height);
  return (
    <Canvas style={{ flex: 1 }}>
    <Group transform={fitbox("contain", src, dst)}>
      <ImageSVG svg={svg} x={0} y={0} width={20} height={20} />
      </Group>
    </Canvas>
  );
};

export default SkiaPlayGround;

const styles = StyleSheet.create({});
