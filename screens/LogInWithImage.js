//https://www.youtube.com/watch?v=h5qqI1-ZHwg
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { height, width } from "../constants/dimensions";
import { myColors } from "../constants/colors";
import * as NavigationBar from "expo-navigation-bar";
import FormTextInput from "../components/mini/FormTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
const LogInWithImage = () => {
  const runMe = async () => {
    const visibility = await NavigationBar.setVisibilityAsync("hidden");
  };
  useEffect(() => {
    runMe();
  }, []);

  const progress = useRef(new Animated.Value(0)).current;
  const logIn = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const back = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -height / 3 - 50],
                }),
              },
            ],
          },
        ]}
      >
        <Svg width={width} height={height + 50}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("../assets/images/login.jpg")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidyMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
        <Animated.View
          style={{
            position: "absolute",
            top: height - height / 3,
            left: width / 2 - 230 / 2,
            justifyContent: "center",
            alignItems: "center",
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <TouchableOpacity onPress={() => logIn()} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ marginTop: 6 }, styles.button]}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
        <View>
          <Animated.View
            style={{
              width: 40,
              top: -20,
              height: 40,
              backgroundColor: "white",
              position: "absolute",
              left: width / 2 - 20,
              borderRadius: 100,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              elevation: 4,
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              zIndex: 2,
              transform: [
                {
                  rotate: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-90deg", "0deg"],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity onPress={() => back()}>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>
          </Animated.View>
          <View
            style={[
              {
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginTop: 20,
              },
            ]}
          >
            <FormTextInput placeholder="Email" />
            <FormTextInput placeholder="Password" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default LogInWithImage;

const styles = StyleSheet.create({
  button: {
    width: 230,
    backgroundColor: myColors.black,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
});
