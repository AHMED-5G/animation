import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HotelCard = ({ item, index, scrollX, activeCardIndex }) => {
  let cardWidth = 200;
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.2, 1, 0.2],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });
  return (
    <TouchableOpacity
     disabled={activeCardIndex != index}
     >
      <Animated.View
        style={{
          height: 220,
          width: cardWidth,
          backgroundColor: "#EEE",
          margin: 5,
          borderRadius: 15,
          transform: [{ scale }],
        }}
      >
        <Animated.View style={{ opacity: opacity }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 200,
              height: 150,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />

          <View
            style={{
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "800",
              }}
            >
              {item.name}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({});
