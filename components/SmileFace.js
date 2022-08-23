import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const SmileFace = ({ onEmojiSelected }) => {
  return (
    <TouchableOpacity onPress={() => onEmojiSelected()}>
      <Image
        source={require("../assets/images/smile.png")}
        style={{ height: 90, width: 90 }}
      />
    </TouchableOpacity>
  );
};

export default SmileFace;

const styles = StyleSheet.create({});
