import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ExpoDraw from "expo-draw";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { width, height } from "../constants/dimensions";
export default () => {
  const AnimatedDraw = Animated.createAnimatedComponent(ExpoDraw);
  const size = 100;

  const startingIndex = useSharedValue(3);

  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);

  const r1Expecting = "l2";
  const r2Expecting = "l1";
  const [r1Answer, setR1Answer] = useState();
  const [r2Answer, setR2Answer] = useState();

  const [drawingNow, setDrawingNow] = useState(false);
  const l1Style = useAnimatedStyle(() => {
    return {
      zIndex: startingIndex.value,
    };
  });
  const [x, setX] = useState(0);
  const [onStartXY, setOnStartXY] = useState({ x: 0, y: 0 });
  const [onActiveXY, setOnActiveXY] = useState({ x: 0, y: 0 });
  const [onEndXY, setOnEndXY] = useState({ x: 0, y: 0 });
  const drawRef = useRef(0);
  return (
    <GestureHandlerRootView
      style={{
        height: height - 200,
        // zIndex: 1,
        // flex: 1,
        backgroundColor: "#EEE",
      }}
      pointerEvents={{
        onscroll: (event) => {
          console.log(event);
        },
      }}
    >
      {/* <PanGestureHandler onGestureEvent={panGestureEvent}> */}
      <ExpoDraw
        setOnStartXY={setOnStartXY}
        setOnActiveXY={setOnActiveXY}
        setOnEndXY={setOnEndXY}
        strokes={styles.ss}
        containerStyle={{ backgroundColor: "rgba(0,0,0,0.01)" }}
        rewind={(undo) => {
          //   this._undo = undo;
        }}
        clear={(clear) => {
          //   this._clear = clear;
        }}
        color={"#000000"}
        strokeWidth={2}
        enabled={true}
        ref={drawRef}
        onChangeStrokes={(strokes) => {
          //   console.log(
          //     strokes[0][0],
          //     strokes[0].length,
          //     strokes[0][strokes[0].length - 1]
          //   );
          //   setDrawingNow(true);
        }}
        drawSurfaceZIndex={3}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,256, .5)",
              position: "absolute",
              left: 10,
              top: 120,
              zIndex: 2,
            },
            //   l1Style,
          ]}
        />
        <View
          style={[
            {
              width: size,
              height: size,
              borderRadius: 20,
              position: "absolute",
              borderWidth: 1,
              borderColor: r1Answer == r1Expecting ? "black" : "black",
              right: 10,
              top: 120,
              zIndex: 2,
            },
          ]}
        />
        <View
          style={{
            flexDirection: "column",
            width: size,
            height: size,
            borderRadius: 20,
            position: "absolute",
            borderWidth: r1Answer == r1Expecting ? 2 : 1,
            borderColor: r1Answer == r1Expecting ? "green" : "black",
            right: 10,
            top: 120,
            zIndex: 2,
          }}
        >
          <Text>{r1}</Text>
        </View>
        <View
          style={[
            {
              flexDirection: "column",
              width: size,
              height: size,
              borderRadius: 100,
              position: "absolute",
              borderWidth: r2Answer == r2Expecting ? 2 : 1,
              borderColor: r2Answer == r2Expecting ? "green" : "black",
              right: 10,
              top: 240,
              zIndex: 2,
            },
          ]}
        >
          <Text>{r2}</Text>
        </View>
      </ExpoDraw>
      {/* </PanGestureHandler> */}
      <View>
        <Text>drawingNow : {drawingNow}</Text>
        <Text>on start x : {onStartXY.x}</Text>
        <Text>on active x : {onActiveXY.x}</Text>
        <Text>on end x : {onEndXY.x}</Text>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  ss: {
    backgroundColor: "red",
  },
});
