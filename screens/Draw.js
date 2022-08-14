import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpoDraw from "expo-draw";
export default () => {
  return (
    <ExpoDraw
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
      onChangeStrokes={(strokes) => console.log(strokes)}
      drawSurfaceZIndex={1}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "rgba(0,0,256, .5)",
          // borderRadius: 100,
          position: "absolute",
          left: 20,
          top: 120,
          // zIndex: 3,
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "rgba(0,0,256, .5)",
          // borderRadius: 100,
          position: "absolute",
          left: 20,
          top: 240,
          // zIndex: 3,
        }}
      />
    </ExpoDraw>
  );
};
const styles = StyleSheet.create({
  ss: {
    backgroundColor: "red",
  },
});
