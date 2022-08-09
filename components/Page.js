import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { height, width } from "../constants/dimensions";
import { myColors } from "../constants/colors";

const Page = ({ index, title, translateX }) => {
  const pageOffset = width * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          flex: 1,
          backgroundColor: myColors.grey4,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        },
        rStyle,
      ]}
    >
      <Text style={{ fontSize: 62, fontWeight: "900" }}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({});
