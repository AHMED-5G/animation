import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const GridImage = ({ image, width }) => {
  return (
    <View
      key={image.id}
      style={{ width: width, height: width, marginVertical: 10 }}
    >
      <Image
        source={{ uri: image }}
        style={{
          flex: 1,
          height: null,
          width: null,
        }}
      />
    </View>
  );
};

export default GridImage;

const styles = StyleSheet.create({});
