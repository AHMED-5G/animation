import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Product } from "../types";
import ProductCard from "../components/removeAllItems/ProductCard";
import MyLine from "../components/Line";
import { height, width } from "../constants/dimensions";
import MedButton from "../components/newMini/MedButton";
import { myColors } from "../constants/colors";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { removeAllItemCategories, removeAllItemProducts } from "../dummy";
import { AntDesign } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {};
const redColor = "#FF0F0F";

const RemoveAllItems = (props: Props) => {
  const removeOrderFirstTimeProgress = useSharedValue(0);
  const removeOrderSecondTimeProgress = useSharedValue(0);
  const placeOrderRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderFirstTimeProgress.value,
      [0, 1],
      [0, -width / 2]
    );
    return {
      left: toLeft,
    };
  });
  const removeAllButtonRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderFirstTimeProgress.value,
      [0, 1],
      [0, -width / 2]
    );
    const backgroundColor = interpolateColor(
      removeOrderFirstTimeProgress.value,
      [0, 1],
      ["white", redColor]
    );
    const borderColor = interpolateColor(
      removeOrderFirstTimeProgress.value,
      [0, 1],
      [redColor, "black"]
    );
    return {
      left: toLeft,
      backgroundColor,
      borderColor,
    };
  });

  const cancelButtonRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderFirstTimeProgress.value,
      [0, 1],
      [0, -width / 2]
    );
    return {
      left: toLeft,
    };
  });
  const firstStepDuration = 500;
  const removeAllFirstTime = () => {
    removeOrderFirstTimeProgress.value = withTiming(1, {
      duration: firstStepDuration,
    });
  };

  const cancelRemoveAll = () => {
    removeOrderFirstTimeProgress.value = withTiming(0, {
      duration: firstStepDuration,
    });
  };
  const removeAllFinalStep = () => {
    removeOrderSecondTimeProgress.value = withTiming(1, {
      duration: 2000,
      //   easing: Easing.quad,
    });
  };

  const flatListRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderSecondTimeProgress.value,
      [0, 0.3],
      [0, width]
    );
    const opacity = interpolate(
      removeOrderSecondTimeProgress.value,
      [0, 0.3],
      [1, 0]
    );
    return {
      left: toLeft,
      opacity,
    };
  });

  const costInformationRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderSecondTimeProgress.value,
      [0, 0.5],
      [0, width]
    );
    const opacity = interpolate(
      removeOrderSecondTimeProgress.value,
      [0, 0.5],
      [1, 0]
    );
    return {
      left: toLeft,
      opacity,
    };
  });
  const categoryContainerRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderSecondTimeProgress.value,
      [0.2, 1],
      [width, 0]
    );
    return { left: toLeft };
  });
  const buttonsContainerRStyle = useAnimatedStyle(() => {
    const toLeft = interpolate(
      removeOrderSecondTimeProgress.value,
      [0, 1],
      [0, -width * 2]
    );
    return { left: toLeft };
  });
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          flex: 1,
          //   justifyContent: "center",
          //   alignContent: "center",
          //   alignItems: "center",
        }}
      >
        <Animated.View style={[{ marginLeft: 5 }, flatListRStyle]}>
          <FlatList
            data={removeAllItemProducts}
            renderItem={({ item }) => {
              return <ProductCard product={item} />;
            }}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
        <Animated.View style={costInformationRStyle}>
          <MyLine />
          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 5,
              }}
            >
              <View>
                <Text style={styles.textStyle}>Subtotal</Text>
              </View>
              <View style={{ marginRight: 5 }}>
                <Text style={styles.textStyle}>{88 + " $"}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 5,
                marginTop: 15,
              }}
            >
              <View>
                <Text style={styles.textStyle}>Shipping</Text>
              </View>
              <View style={{ marginRight: 5 }}>
                <Text style={styles.textStyle}>{10 + " $"}</Text>
              </View>
            </View>
          </View>
          <MyLine />
          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 5,
              }}
            >
              <View>
                <Text style={[styles.textStyle, { fontWeight: "800" }]}>
                  Total
                </Text>
              </View>
              <View style={{ marginRight: 5 }}>
                <Text style={[styles.textStyle, { fontWeight: "800" }]}>
                  {98 + " $"}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            { marginTop: 190, flexDirection: "row" },
            buttonsContainerRStyle,
          ]}
        >
          <Animated.View style={placeOrderRStyle}>
            <MedButton
              style={{
                width: width / 2 - 10,
                backgroundColor: "black",
                borderRadius: 20,
              }}
              textStyle={{ fontSize: 24 }}
              title="Place order"
              onPress={() => {}}
            />
          </Animated.View>
          <Animated.View
            style={[styles.removeAllButtonStyle, removeAllButtonRStyle]}
          >
            <TouchableOpacity
              style={styles.removeAllTouchableStyle}
              onPress={() => {
                if (removeOrderFirstTimeProgress.value == 0) {
                  removeAllFirstTime();
                } else {
                  removeAllFinalStep();
                }
              }}
            >
              <Text
                disabled
                style={{ fontWeight: "bold", fontSize: 28, color: "black" }}
              >
                Remove all
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={cancelButtonRStyle}>
            <MedButton
              style={styles.cancelButtonStyle}
              textStyle={{ fontSize: 24, color: "black" }}
              title="Cancel"
              onPress={() => {
                cancelRemoveAll();
              }}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            {
              marginTop: 10,
              position: "absolute",
              top: height - 600,
              width: width,
              borderRadius: 10,
            },
            categoryContainerRStyle,
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                opacity: 0.5,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="cart-remove"
                size={94}
                color="black"
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Your cart is empty
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 20,
                width: width * 0.85,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                height: 60,
                flexDirection: "row",
                marginTop: 30,
              }}
            >
              <AntDesign name="home" size={28} color="white" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 28,
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Go home
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 10 }}>
            {removeAllItemCategories.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  {
                    height: 60,
                    backgroundColor: myColors.grey5,
                    borderRadius: 5,
                    flexDirection: "row",
                    marginLeft: index > 0 ? 10 : 0,
                    alignItems: "center",
                  },
                ]}
              >
                <View style={{ marginLeft: 5 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                  />
                </View>
                <View
                  style={{
                    height: "80%",
                    width: 1,
                    backgroundColor: "black",
                    marginLeft: 5,
                    opacity: 0.5,
                  }}
                ></View>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <Text style={{ fontSize: 19, fontWeight: "800" }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default RemoveAllItems;

const styles = StyleSheet.create({
  textStyle: { fontSize: 14, fontWeight: "500" },
  cancelButtonStyle: {
    width: width / 2 - 10,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: redColor,
  },
  removeAllButtonStyle: {
    width: width / 2 - 10,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: myColors.redFavorite,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  removeAllTouchableStyle: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
