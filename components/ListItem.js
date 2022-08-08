import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { myColors } from "../constants/colors";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { width } from "../constants/dimensions";
const listItemHeight = 70;
const ListItem = ({ task, onDismiss, simultaneousHandlers }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(listItemHeight);
  const margin = useSharedValue(10);
  const opacity = useSharedValue(1);
  const TRANSLATE_X_THRESHOLD = -width * 0.3;
  const rIconContainerStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value, height: itemHeight.value };
  });
  const panGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        margin.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)?.(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    margin: margin.value,
    height: itemHeight.value,
  }));

  const rTaskContainer = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      margin: margin.value,
      opacity: opacity.value,
      display: margin.value,
    };
  });
  return (
    <GestureHandlerRootView>
      <View
        style={[
          {
            alignItems: "center",
            width: "100%",
            margin: 10,
          },
          rTaskContainer,
        ]}
      >
        <Animated.View
          style={[
            {
              height: listItemHeight,
              width: listItemHeight,
              position: "absolute",
              right: "10%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            },
            rIconContainerStyle,
          ]}
        >
          <AntDesign
            style={{ height: listItemHeight * 0.4 }}
            name="delete"
            size={24}
            color="red"
          />
        </Animated.View>
        <PanGestureHandler
          //to prevent conflict between PanGestureHandler and scrolling bu scrollView so we use ref
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGestureHandler}
        >
          <Animated.View style={[styles.task, rStyle]} key={task.index}>
            <Text style={{ fontSize: 16 }}>{task.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: listItemHeight,
    backgroundColor: myColors.grey5,
    borderRadius: 12,
    alignContent: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    elevation: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
  },
});
