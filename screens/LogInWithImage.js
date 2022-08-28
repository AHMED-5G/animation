import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { height, width } from "../constants/dimensions";
import { myColors } from "../constants/colors";

const LogInWithImage = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const logIn = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const back =()=>{
    Animated.timing(progress, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
  }
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            height: height,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -height / 3],
                }),
              },
            ],
          },
        ]}
      >
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../assets/images/login.jpg")}
        >
          <Animated.View
            style={{
              top: height - height / 3,
              justifyContent: "center",
              alignItems: "center",
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <TouchableOpacity onPress={() => logIn()} style={styles.button}>
              <Text style={styles.buttonText}>Log ip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 6 }, styles.button]}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </Animated.View>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "white",
              position: "absolute",
              bottom: -25,
              left: width / 2 - 25,
              borderRadius: 100,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => back()}>
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
