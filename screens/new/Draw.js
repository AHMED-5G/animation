import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import ExpoDraw from "../components/DrawClass";
import { width, height } from "../constants/dimensions";

const Draw = () => {
  const size = 100;
  const top1 = 120;
  const top2 = 240;
  const lLeft = 10;
  const answers = { r1: "l2", r2: "l1" };

  const [drawingEnabled, setDrawingEnabled] = useState(true);
  const [startingObject, setStartingObject] = useState();
  const [points, setPoints] = useState(0);

  const [strokes, setStrokes] = useState([]);
  const [lineColor, setLineColor] = useState("black");
  const [solvedObjects, setSolvedObjects] = useState([]);
  const l1DimensionsXY = {
    xStart: lLeft,
    xEnd: lLeft + size,
    yStart: top1,
    yEnd: top1 + size,
  };

  const l2DimensionsXY = {
    xStart: lLeft,
    xEnd: lLeft + size,
    yStart: top2,
    yEnd: top2 + size,
  };

  const r1DimensionsXY = {
    xStart: width - 10 - size,
    xEnd: width - lLeft,
    yStart: top1,
    yEnd: top1 + size,
  };

  const r2DimensionsXY = {
    xStart: width - 10 - size,
    xEnd: width - lLeft,
    yStart: top2,
    yEnd: top2 + size,
  };

  const witchObject = (x, y) => {
    if (
      x >= l1DimensionsXY.xStart &&
      x <= l1DimensionsXY.xEnd &&
      y >= l1DimensionsXY.yStart &&
      y <= l1DimensionsXY.yEnd
    ) {
      return "l1";
    } else if (
      x >= l2DimensionsXY.xStart &&
      x <= l2DimensionsXY.xEnd &&
      y >= l2DimensionsXY.yStart &&
      y <= l2DimensionsXY.yEnd
    ) {
      return "l2";
    } else if (
      x > r1DimensionsXY.xStart &&
      x <= r1DimensionsXY.xEnd &&
      y >= r1DimensionsXY.yStart &&
      y <= r1DimensionsXY.yEnd
    ) {
      return "r1";
    } else if (
      x > r2DimensionsXY.xStart &&
      x <= r2DimensionsXY.xEnd &&
      y >= r2DimensionsXY.yStart &&
      y <= r2DimensionsXY.yEnd
    ) {
      return "r2";
    }
  };

  const isSolved = (object) => {
    return solvedObjects.includes(object);
  };

  const startDrawingConditions = (x, y) => {
    if (x > width / 2 || y < top1) {
      setStartingObject(null);
      return;
    }
    return true;
  };
  const onActiveConditions = (x, y) => {
    if (!startingObject) return;
    if (x < width / 2 || y < top1) return;
    return true;
  };
  const onEndConditions = (x, y) => {
    if (!startingObject || x < width / 2) {
      return;
    }

    return true;
  };

  const onStart = (x, y) => {
    const conditions = startDrawingConditions(x, y);
    if (conditions) {
      const startObject = witchObject(x, y);
      const solved = isSolved(startObject);
      if (!solved) {
        setStartingObject(startObject);
      } else {
      }
    } else {
    }
  };

  const onActive = (x, y) => {
    const conditions = onActiveConditions(x, y);
    if (conditions) {
      let object = witchObject(x, y);
      if (object) {
        if (answers[object] == startingObject) {
          setLineColor("green");
        }
      }
    }
  };
  const onEnd = (x, y) => {
    setLineColor("black");
    const conditions = onEndConditions(x, y);
    if (conditions) {
      const object = witchObject(x, y);
      if (object) {
        const solved = isSolved(object);
        if (!solved) {
          if (answers[object] == startingObject) {
            setPoints((prev) => prev + 1);
          }
          setSolvedObjects((prev) => [...prev, startingObject, object]);
          setStartingObject(null);
        }
      }
    }
  };

  let myRewind = () => {
    console.log("rrr");
  };
  let myClear = () => {};
  // let A = new ExpoDraw(rewind, clear);
  return (
    <View style={{}}>
      <View
        style={{
          height: height - 110,
          backgroundColor: "#EEE",
        }}
      >
        <ExpoDraw
          strokes={[]}
          onStart={onStart}
          onActive={onActive}
          onEnd={onEnd}
          containerStyle={{ backgroundColor: "rgba(0,0,0,0.01)" }}
          rewind={(undo) => {
            myRewind = undo;
          }}
          clear={(clear) => (myClear = clear)}
          color={lineColor}
          strokeWidth={2}
          onChangeStrokes={(strokes) => {
            // setStrokes((prev) => [...prev, strokes]);
          }}
          enabled={drawingEnabled}
          drawSurfaceZIndex={3}
        >
          <View
            pointerEvents="none"
            onTouchStart={() => console.log("ss")}
            style={{
              width: size,
              height: size,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,256, .5)",
              position: "absolute",
              left: 10,
              top: top1,
              zIndex: 2,
            }}
          />
          <View
            pointerEvents="none"
            style={[
              {
                width: size,
                height: size,
                borderRadius: 100,
                position: "absolute",
                backgroundColor: "red",
                left: 10,
                top: top2,
                zIndex: 2,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              {
                flexDirection: "column",
                width: size,
                height: size,
                borderRadius: 100,
                position: "absolute",
                borderWidth: 1,
                borderColor: "black",
                left: width - 10 - size,
                top: top1,
                zIndex: 2,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={{
              flexDirection: "column",
              width: size,
              height: size,
              borderRadius: 20,
              position: "absolute",
              borderWidth: 1,
              borderColor: "black",
              left: width - 10 - size,
              top: top2,
              zIndex: 2,
            }}
          />
        </ExpoDraw>
      </View>
    </View>
  );
};

export default Draw;

const styles = StyleSheet.create({
  ss: {
    backgroundColor: "red",
  },
});
