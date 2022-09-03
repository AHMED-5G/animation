import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { height, width } from "../constants/dimensions";
import WhatsUp from "../components/WhatsUp";
const WORDS = ["Whats", "Up", "Mobile", "Devs"];

const WhatsUpReanimated = () => {
  const translateX = useSharedValue(0);
  const ScrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={ScrollHandler}
      //fire on scroll each 16 ms
      scrollEventThrottle={16}
      style={styles.container}
      horizontal
      pagingEnabled
    >
      {WORDS.map((title, index) => (
        <WhatsUp {...{ title, index, translateX }} />
      ))}
    </Animated.ScrollView>
  );
};

export default WhatsUpReanimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

});
