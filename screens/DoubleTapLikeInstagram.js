import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useCallback, useRef } from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import LightHeader from "../components/mini/LightHeader";
import { width } from "../constants/dimensions";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTapLikeInstagram = () => {
  const doubleTapRef = useRef();
  let scale = useSharedValue(0);
  let opacity = useSharedValue(1);
  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(400, withSpring(0));
      }
    });
  }, []);
  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(400, withTiming(1));
      }
    });
  }, []);
  let rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        //Math.max to prevent with spring from flipping item because its going to negative
        scale: Math.max(scale.value, 0),
      },
    ],
  }));
  let rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <View>
      <EmptyHeader />
      <LightHeader back />
      <GestureHandlerRootView>
        <TapGestureHandler
          waitFor={doubleTapRef}
          onActivated={onSingleTap}
          numberOfTaps={1}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            maxDelayMs={250}
            onActivated={onDoubleTap}
            numberOfTaps={2}
          >
            <Animated.View>
              <ImageBackground
                source={require("../assets/images/insta.jpg")}
                style={{ width: width, height: width }}
              >
                <AnimatedImage
                  source={require("../assets/images/like.png")}
                  style={[{ width: width, height: width }, rStyle]}
                  resizeMode="center"
                />
              </ImageBackground>
              <Text style={{ fontSize: 30 }}>By Some One</Text>
              <Animated.Text style={[{ fontSize: 30 }, rTextStyle]}>
                ㋡㋡
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default DoubleTapLikeInstagram;

const styles = StyleSheet.create({});
