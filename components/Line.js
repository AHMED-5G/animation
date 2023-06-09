import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyLine = ({ width = "100%" }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 10,
          height: 1,
          backgroundColor: "grey",
          opacity: 0.2,
          width: width ?? "100%",
        }}
      />
    </View>
  );
};

export default MyLine;

const styles = StyleSheet.create({});
