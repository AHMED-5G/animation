import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import React, { useState, useRef } from "react";
import Pen from "../node_modules/expo-draw/src/tools/pen";
import Point from "../node_modules/expo-draw/src/tools/point";
import Svg, { G, Path } from "react-native-svg";
const DrawComponent = ({ ...props }) => {
  const [tracker, setTracker] = useState("0");
  const [currentPoints, setCurrentPoints] = useState([]);
  const [previousStrokes, setPreviousStrokes] = useState([]);
  // const [pen, setPen] = useState(new Pen());
  const pen = new Pen();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => onResponderGrant(evt),
      onPanResponderMove: (evt) => onResponderMove(evt),
      onPanResponderRelease: (evt) => onResponderRelease(evt),
    })
  ).current;

  const onResponderGrant = (evt) => {
    onTouch(evt);
  };

  const onResponderMove = (evt) => {
    onTouch(evt);
  };

  const onResponderRelease = () => {
    let myStrokes = previousStrokes;
    if (currentPoints.length < 1) return;

    var points = currentPoints;

    pen.addStroke(currentPoints);

    setPreviousStrokes([...myStrokes, points]);
    setCurrentPoints([]);
    setTracker(tracker + 1);

    onChangeStrokes([...myStrokes, points]);
  };

  const onTouch = (evt) => {
    if (props.enabled == false) return;
    let x, y, timestamp;
    [x, y, timestamp] = [
      evt.nativeEvent.locationX,
      evt.nativeEvent.locationY,
      evt.nativeEvent.timestamp,
    ];

    let newCurrentPoints = currentPoints;

    newCurrentPoints.push({ x, y, timestamp });

    setPreviousStrokes(previousStrokes);
    setCurrentPoints(newCurrentPoints);
    setTracker(tracker);
  };

  const onLayoutContainer = (e) => {
    pen.setOffset(e.nativeEvent.layout);
  };

  const onChangeStrokes = (strokes) => {
    if (props.onChangeStrokes) props.onChangeStrokes(strokes);
  };

  const rewind = () => {
    if (currentPoints.length > 0 || previousStrokes.length < 1) return;
    let strokes = previousStrokes;
    strokes.pop();

    pen.rewindStroke();

    setPreviousStrokes([...strokes]);
    setCurrentPoints([]);
    setTracker(tracker - 1);
    onChangeStrokes([...strokes]);
  };

  const clear = () => {
    console.log("clear");
    setPreviousStrokes([]);
    setCurrentPoints([]);
    setTracker(0);
    pen.clear();
    onChangeStrokes([]);
  };

  var props = props.enabled != false ? panResponder.panHandlers : {};

  return (
    // <View style={{ flex: 1, backgroundColor: "green" }}></View>
    <View
      onLayout={onLayoutContainer}
      style={[styles.drawContainer, props.containerStyle]}
      {...panResponder.panHandlers}
    >
      <View
        style={styles.svgContainer}
        // {...props}
        // {...panResponder.panHandlers}
      >
        <Svg style={styles.drawSurface}>
          <G>
            {previousStrokes.map((e) => {
              var points = [];

              for (var i in e) {
                let newPoint = new Point(e[i].x, e[i].y, e[i].timestamp);
                points.push(newPoint);
              }

              return (
                <Path
                  key={e[0].timestamp}
                  d={pen.pointsToSvg(points)}
                  stroke={props.color || "#000000"}
                  strokeWidth={props.strokeWidth || 4}
                  fill="none"
                />
              );
            })}
            <Path
              key={tracker}
              d={pen.pointsToSvg(currentPoints)}
              stroke={props.color || "#000000"}
              strokeWidth={props.strokeWidth || 4}
              fill="none"
            />
          </G>
        </Svg>
        {props.children}
      </View>
    </View>
  );
};

export default DrawComponent;
let styles = StyleSheet.create({
  drawContainer: {
    // flex: 1,
    display: "flex",
    zIndex: 5,
  },
  svgContainer: {
    // flex: 1,
    // backgroundColor: "green",
    zIndex: 5,
  },
  drawSurface: {
    // flex: 1,
    zIndex: 5,
  },
});
