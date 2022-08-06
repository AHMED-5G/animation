//https://www.youtube.com/watch?v=QxGQwRqxbSA
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import Ripple from "../components/Ripple";
import {
  TapGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
const RippleEffectAnimation = () => {
  return (
    <View>
      <EmptyHeader />
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Ripple
          style={{
            width: 200,
            height: 200,
            backgroundColor: "white",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 20,
            elevation: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
          onTap={() => {
            console.log("taaap");
          }}
        ></Ripple>
      </View>
    </View>
  );
};

export default RippleEffectAnimation;

const styles = StyleSheet.create({});
