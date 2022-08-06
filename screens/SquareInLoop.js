//https://www.youtube.com/watch?v=PfC5Phrueww
import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import { myColors } from "../constants/colors";
import LightHeader from "../components/mini/LightHeader";

const SquareInLoop = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(progress, {
            toValue: 0.5,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.spring(scale, {
            toValue: 2,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
      ]),
      // { iterations: 3 }
    ).start();
  }, []);
  const size = 100;

  return (
    <View style={{ flex: 1 }}>
      <EmptyHeader />
      <LightHeader back />
      <View
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: myColors.medBlue,
            opacity: progress,
            transform: [
              { scale },
              {
                rotate: progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: ["90deg", "180deg"],
                }),
              },
            ],
            borderRadius: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [size / 4, size / 2],
            }),
          }}
        >
          <Text>Square In Loop</Text>
        </Animated.View>
      </View>
    </View>
  );
};
export default SquareInLoop;

const styles = StyleSheet.create({});
