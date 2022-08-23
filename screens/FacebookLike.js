import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { width } from "../constants/dimensions";
import { myColors } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import SadFace from "../components/SadFace";
import SmileFace from "../components/SmileFace";
const FacebookLike = () => {
  const LikeOptionProgress = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);
  const [LikeOptionViewState, setLikeOptionViewState] = useState(false);
  const onEmojiSelected = () => {
    setLiked(true);
    closeLikeView();
  };
  const openLikeView = () => {
    Animated.spring(LikeOptionProgress, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setLikeOptionViewState(true);
  };
  useEffect(() => {
    if (setLikeOptionViewState) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotate, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [LikeOptionViewState]);

  const closeLikeView = () => {
    Animated.spring(LikeOptionProgress, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setLikeOptionViewState(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          width: width,
          height: 300,
          backgroundColor: myColors.grey5,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableWithoutFeedback
          onPressOut={() => {
            closeLikeView();
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 0,
          }}
        >
          <View
            style={{ width: "100%", height: "100%", position: "absolute" }}
          ></View>
        </TouchableWithoutFeedback>
        <View>
          <Text>Facebook Like</Text>
        </View>
        <View
          style={{
            height: 70,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity onPress={() => openLikeView()}>
            <Text
              style={[
                styles.text,
                { color: liked ? myColors.medBlue : "black" },
              ]}
            >
              Like
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Text style={styles.text}>Share</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 70,
            height: 80,
            width: width - 40,
            borderWidth: 0.5,
            borderRadius: 50,
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            opacity: LikeOptionProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: LikeOptionProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [120, 0],
                }),
              },
            ],
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-10deg", "10deg"],
                  }),
                },
              ],
            }}
          >
            <SmileFace onEmojiSelected={onEmojiSelected} />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-6", "6"],
                  }),
                },
              ],
            }}
          >
            <SadFace onEmojiSelected={onEmojiSelected} />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default FacebookLike;

const styles = StyleSheet.create({
  text: {
    // color: myColors.black,
    fontSize: 23,
    fontWeight: "500",
  },
});
