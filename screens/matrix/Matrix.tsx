import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BlurMask,
  Canvas,
  Fill,
  Paint,
  useFont,
} from "@shopify/react-native-skia";
import { matrixCodeNfi } from "../../assets/fonts";

const Matrix = () => {
  const font = useFont(matrixCodeNfi, 10);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color={"black"} />
      <Paint>
        <BlurMask style={"solid"} blur={8} />
      </Paint>
    </Canvas>
  );
};

export default Matrix;

const styles = StyleSheet.create({});
