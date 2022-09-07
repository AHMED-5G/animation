import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { myColors } from "../constants/colors";
import { width } from "../constants/dimensions";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Bubble = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const bubbleWidth = useSharedValue(70);
  const openBubbleProgress = useSharedValue(0);

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
      translateY.value = event.translationY + context.y;
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {
          translateY: translateY.value,
        },
      ],
      width: interpolate(
        openBubbleProgress.value,
        [0, 1],
        [bubbleWidth.value, width]
      ),
    };
  });

  const openBubble = () => {
    openBubbleProgress.value = withTiming(
      1,
      {
        duration: 300,
      },
      setBubbleOpen(true)
    );
  };
  const closeBubble = () => {
    openBubbleProgress.value = withTiming(
      0,
      {
        duration: 300,
      },
      setBubbleOpen(false)
    );
  };
  const doubleTapFire = () => {
    !bubbleOpen ? openBubble() : closeBubble();
  };
  const [inTimeOut, setInTimeOut] = useState(false);
  const handelDoubleTap = () => {
    if (inTimeOut) doubleTapFire();
    setInTimeOut(true);
    setTimeout(() => {
      setInTimeOut(false);
    }, 250);
  };
  const icons = [
    {
      id: 1,
      icon: (
        <AntDesign
          name="home"
          size={34}
          color="black"
          onPress={() => {
            console.log("home1");
          }}
        />
      ),
    },
    {
      id: 2,
      icon: (
        <AntDesign
          name="edit"
          size={34}
          color="black"
          onPress={() => {
            console.log("home2");
          }}
        />
      ),
    },
    {
      id: 3,
      icon: (
        <AntDesign
          name="setting"
          size={34}
          color="black"
          onPress={() => {
            console.log("home3");
          }}
        />
      ),
    },
  ];
  const iconsRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(openBubbleProgress.value, [0, 1], [190, 0]),
        },
      ],
    };
  });
  const singleIconRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(openBubbleProgress.value, [1, 0], [-190, 0]),
        },
      ],
    };
  });
  const iconsContainerRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        openBubbleProgress.value,
        [0, 1],
        [bubbleWidth.value, width]
      ),
    };
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.bubble, rStyle]}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                !bubbleOpen ? openBubble() : closeBubble();
                // handelDoubleTap()
              }}
            >
              {bubbleOpen ? (
                <Animated.View
                  style={[
                    {
                      flex: 1,
                      justifyContent: "space-around",
                      flexDirection: "row",
                      alignContent: "space-between",
                      alignItems: "center",
                      overflow: "hidden",
                    },
                    iconsContainerRStyle,
                  ]}
                >
                  {icons.map((icon, index) => {
                    return (
                      <Animated.View style={[{}, iconsRStyle]}>
                        {icon.icon}
                      </Animated.View>
                    );
                  })}
                </Animated.View>
              ) : (
                <Animated.View
                  style={[
                    {
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    },
                    iconsContainerRStyle,
                  ]}
                >
                  <Animated.View style={[{}, singleIconRStyle]}>
                    <Entypo name="menu" size={34} color="black" />
                  </Animated.View>
                </Animated.View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  bubble: {
    width: 70,
    height: 70,
    backgroundColor: myColors.secondary,
    borderRadius: 70,
  },
});
