import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const SadFace = ({onEmojiSelected}) => {
  return (
    <TouchableOpacity onPress={() => onEmojiSelected()}>
      <Image
        source={require("../assets/images/sad.png")}
        style={{ height: 90, width: 90 }}
      />
    </TouchableOpacity>
  );
};

export default SadFace;

const styles = StyleSheet.create({});
