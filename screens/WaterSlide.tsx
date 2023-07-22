import { StyleSheet, View, Text as RnText } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  Text,
  Vertices,
  useClockValue,
  useComputedValue,
  useValue,
  vec,
  LinearGradient,
  useTouchHandler,
} from "@shopify/react-native-skia";
import { TouchableOpacity } from "react-native";
import { width } from "../constants/dimensions";
import { curveBasis, line } from "d3";

const waveWidth = 150;
const frequency = 2;
const initialAmplitude = 10;
const verticalShiftConst = 100;
const waveHeight = 600;
const horizontalShift = (width - waveWidth) / 2;
const indicatorArray = Array.from({ length: 11 }, (_, i) => i);
const WaterSlide = () => {
  const verticalShift = useValue(verticalShiftConst);
  const amplitude = useValue(initialAmplitude);
  const clock = useClockValue();
  const onTouchHandler = useTouchHandler({
    onActive: ({ y }) => {
      if (y > verticalShiftConst) {
        verticalShift.current = Math.min(waveHeight, y);
        amplitude.current = Math.max(
          0,
          (waveHeight - verticalShift.current) * 0.025
        );
      }
    },
  });
  const getLabelYValueOffset = (position: number) => {
    return verticalShiftConst + 50 * position;
  };

  const getLabelYValue = (position: number) => {
    return `${100 - position * 10}`;
  };
  const trianglePath = useComputedValue(() => {
    return [
      vec(horizontalShift * 2.6, verticalShift.current - 20),
      vec(horizontalShift * 2.6, verticalShift.current + 20),
      vec(horizontalShift * 2.3, verticalShift.current),
    ];
  }, [verticalShift]);

  const createWavePath = (phase = 20) => {
    const points = Array.from(
      { length: waveWidth + horizontalShift },
      (_, index) => {
        const angle =
          ((index - horizontalShift) / waveWidth) * (Math.PI * frequency) +
          phase;

        return [
          index,
          amplitude.current * Math.sin(angle) + verticalShift.current,
        ];
      }
    );
    const shiftedPoints = points.slice(horizontalShift, 300) as [
      number,
      number
    ][];

    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(shiftedPoints);

    const bottomLine = `L${
      waveWidth + horizontalShift
    } , ${waveHeight} L ${horizontalShift} , ${waveHeight} `;

    const extendedWavePath = `${waveLine} ${bottomLine} Z`;
    return extendedWavePath;
  };

  const animatedPath = useComputedValue(() => {
    const current = (clock.current / 225) % 225;

    const start = Skia.Path.MakeFromSVGString(createWavePath(current))!;
    const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current))!;

    return start.interpolate(end, 0.5);
  }, [clock, verticalShift]);

  const gradientStart = useComputedValue(() => {
    return vec(0, verticalShift.current);
  }, [verticalShift]);
  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalShift.current + 150);
  }, [verticalShift]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Canvas style={styles.canvas} onTouch={onTouchHandler}>
        {indicatorArray.map((val) => (
          <Text
            key={val.toString()}
            x={50}
            y={getLabelYValueOffset(val)}
            text={getLabelYValue(val)}
            color={"white"}
            font={null}
          ></Text>
        ))}
        <Path color={"red"} path={animatedPath} style={"fill"}>
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={["orange", "red"]}
          />
        </Path>
        <Vertices vertices={trianglePath} color={"red"} />
      </Canvas>
      <TouchableOpacity style={styles.btnContainer}>
        <RnText>GET VALUE</RnText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WaterSlide;

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  btnContainer: {},
});
