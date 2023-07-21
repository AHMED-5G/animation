//https://www.youtube.com/watch?v=-a-3gAQB4eg&t=545s

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MedButton from "../components/newMini/MedButton";
import { DataPoint, animatedData, originalData } from "../data";
import {
  Canvas,
  Line,
  Path,
  SkPath,
  Skia,
  runTiming,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import Svg, { G } from "react-native-svg";
import { Easing } from "react-native-reanimated";
type GraphData = {
  min: number;
  max: number;
  curve: SkPath;
};

const Graph = () => {
  const isTransactionCompleted = useValue(1);
  const transactionState = useValue({
    currentChart: 0,
    next: 1,
  });
  const graphHeight = 400;
  const graphWidth = 370;
  function makeGraph(data: DataPoint[]): GraphData {
    const min = Math.min(...data.map((point) => point.value));
    const max = Math.max(...data.map((point) => point.value));
    const getYAxis = scaleLinear().domain([0, max]).range([graphHeight, 35]);
    const getXAxis = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([10, graphWidth - 10]);

    const curvedLine = line<DataPoint>()
      .x((d) => getXAxis(new Date(d.date)))
      .y((d) => getYAxis(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return { min, max, curve: skPath! };
  }

  const graphData = [makeGraph(originalData), makeGraph(animatedData)];

  const transitionCharts = (target: number) => {
    transactionState.current = {
      currentChart: target,
      next: transactionState.current.currentChart,
    };

    isTransactionCompleted.current = 0;

    runTiming(isTransactionCompleted, 1, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const currentPath = useComputedValue(() => {
    const start = graphData[transactionState.current.currentChart].curve;
    const end = graphData[transactionState.current.next].curve;
    const result = start.interpolate(end, isTransactionCompleted.current);
    return result?.toSVGString() ?? "";
  }, [transactionState, isTransactionCompleted]);

  return (
    <View>
      <MedButton
        title="Graph 1"
        onPress={() => {
          transitionCharts(0);
        }}
        borderRadius={10}
        width={90}
        textStyle={{ fontSize: 18 }}
      />
      <MedButton
        title="Graph 2"
        onPress={() => {
          transitionCharts(1);
        }}
        style={{ marginTop: 10 }}
        borderRadius={10}
        width={90}
        textStyle={{ fontSize: 18 }}
      />

      <Canvas style={{ width: graphWidth, height: graphHeight }}>
        <Line
          strokeWidth={1}
          color={"lightGrey"}
          p1={vec(10, 130)}
          p2={vec(400, 130)}
        />
        <Line
          strokeWidth={1}
          color={"lightGrey"}
          p1={vec(10, 250)}
          p2={vec(400, 250)}
        />
        <Line
          strokeWidth={1}
          color={"lightGrey"}
          p1={vec(10, 370)}
          p2={vec(400, 370)}
        />
        <Path
          style={"stroke"}
          strokeWidth={4}
          path={currentPath}
          color={"purple"}
        />
      </Canvas>
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({});
