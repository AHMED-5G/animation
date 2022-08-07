//https://www.youtube.com/watch?v=QxGQwRqxbSA
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import Ripple from "../components/Ripple";
import {
  TapGestureHandler,
  RotationGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useAnimatedStyle } from "react-native-reanimated";
const RippleEffectAnimation = () => {

  return (
    <View>
      <EmptyHeader />
      <GestureHandlerRootView
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
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default RippleEffectAnimation;

const styles = StyleSheet.create({});
