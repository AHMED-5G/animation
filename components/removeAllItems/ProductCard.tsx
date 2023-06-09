import { Image, StyleSheet, View, Text } from "react-native";
import React from "react";
import { Product } from "../../types";
import { myColors } from "../../constants/colors";

type Props = {};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 15 }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: 10,
            zIndex: 1,
            left: 80,
            top: -6,
            borderColor: myColors.like1,
            borderWidth: 0.5,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: myColors.grey5,
          }}
        >
          <Text>1</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={{ width: 90, height: 90, borderRadius: 10 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            width: 200,
            marginLeft: 10,
          }}
        >
          <Text style={styles.textStyle}>{product.name}</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textStyle}>{product.price + " " + "$"}</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 0.6,
    borderColor: myColors.grey4,
    borderRadius: 10,
    width: 91,
    height: 91,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textStyle: { fontSize: 14, fontWeight: "500" },
});
