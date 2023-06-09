import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { height, width } from "../constants/dimensions";

import { myColors } from "../constants/colors";
import { Slider } from "react-native-range-slider-expo";
import MedButton from "../components/newMini/MedButton";

type Props = {};
interface ButtonColor {
  color: string;
  text: string;
  contrast: string;
}
const PlusSlide = (props: Props) => {
  const [counter, setCounter] = useState(1);
  const colors: ButtonColor[] = [
    {
      color: "#000000",
      text: "#FFF",
      contrast: "21",
    },
    {
      color: "#fff7f4",
      text: "#000000",
      contrast: "19.86",
    },
    {
      color: "#012d74",
      text: "#FFF",
      contrast: "12.89",
    },
    {
      color: "#8dd2dd",
      text: "#000000",
      contrast: "12.40",
    },
    {
      color: "#b0b9b4",
      text: "#000",
      contrast: "10.44",
    },
    {
      color: "#ac6ad2",
      text: "#000",
      contrast: "5.75",
    },
    {
      color: "#B54A22",
      text: "#000",
      contrast: "3.78",
    },
    {
      color: "#FFE427",
      text: "#B5F9FE",
      contrast: "1.1",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 90 }}>
        <FlatList
          data={colors}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: 10 }}>
                <MedButton
                  width={width / 2 - 40}
                  title={
                    +item.contrast > 4.5
                      ? "Pass" + " " + item.contrast
                      : "Fail" + " " + item.contrast
                  }
                  onPress={() => {}}
                  textStyle={{ fontSize: 22, color: item.text }}
                  style={{ backgroundColor: item.color, borderRadius: 10 }}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.color}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default PlusSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  sliderContainer: {
    height: 100,
    marginTop: 40,
    // marginBottom: 10,
    width: width * 0.8,
    justifyContent: "center",
    alignContent: "center",
  },
});
{
  /* <View style={{ marginTop: 10 }}>
<View
  style={{
    backgroundColor: "#EEE",
    // height: 220,
    borderRadius: 10,
    width: width / 2,
  }}
>
  <Image
    source={{
      uri: "https://images.unsplash.com/photo-1587145820137-a9dbc8c5ed99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    }}
    resizeMode="stretch"
    style={{ width: width / 2, height: 150, borderRadius: 10 }}
  />
  <View style={{ margin: 5 }}>
    <Text style={{ fontSize: 18, fontWeight: "700" }}>
      Sticky Notes 3x3 Inches,Bright Colors Self-Stick
    </Text>
  </View>
</View>
<View
  style={{
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  }}
>
  <View
    style={{
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      //   width: 60,
      height: 50,
      //   backgroundColor: "#EEE",
      borderRadius: 10,
      flexDirection: "row",
    }}
  >
    <View
      style={{
        backgroundColor: "#EEE",
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {counter}
      </Text>
    </View>
    <View
      style={{
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{"X"}</Text>
    </View>
    <View
      style={{
        backgroundColor: "#EEE",
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{"0.3"}</Text>
    </View>
    <View
      style={{
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{"="}</Text>
    </View>
    <View
      style={{
        backgroundColor: "#EEE",
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {counter * 0.3} $
      </Text>
    </View>
  </View>
</View>
</View>
<View style={styles.sliderContainer}>
<Slider
  min={1}
  max={100}
  step={1}
  valueOnChange={(value) => {
    setCounter(value);
  }}
  initialValue={18}
  knobColor="black"
  valueLabelsBackgroundColor="black"
  inRangeBarColor={myColors.grey2}
  outOfRangeBarColor={myColors.grey5}
/>
</View>

<View style={{ marginTop: 10 }}>
<MedButton
  title="Add to cart"
  width={width / 2}
  borderRadius={10}
  color={"#0461cf"}
/>
</View> */
}
