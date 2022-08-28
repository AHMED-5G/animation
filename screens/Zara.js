import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { height, width } from "../constants/dimensions";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
const Zara = () => {
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = height * 0.75;
  const DOT_SIZE = 8;
  const INDICATOR_SIZE = 15;

  const images = [
    "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128",
    "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993",
    "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015",
    "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369",
    "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445",
  ];

  const product = {
    title: "SOFT MINI CROSSBODY BAG WITH KISS LOCK",
    description: [
      "Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.",
      'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
    ],
    price: "29.99£",
  };
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
        <Animated.FlatList
          data={images}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                  }}
                />
              </View>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />
        <View
          style={{
            position: "absolute",
            top: 100,
            left: 20,
          }}
        >
          {images.map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  height: DOT_SIZE,
                  width: DOT_SIZE,
                  borderRadius: 100,
                  backgroundColor: "black",
                  marginBottom: 5,
                }}
              />
            );
          })}
          <Animated.View
            style={[
              {
                height: INDICATOR_SIZE,
                width: INDICATOR_SIZE,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#333",
                position: "absolute",
                top: -DOT_SIZE / 2,
                left: -DOT_SIZE / 2,
              },
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default Zara;

const styles = StyleSheet.create({});
