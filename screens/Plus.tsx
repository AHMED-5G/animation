import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { height, width } from "../constants/dimensions";
import { AntDesign } from "@expo/vector-icons";
import MedButton from "../components/mini/MedButton";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { myColors } from "../constants/colors";
import { Slider } from "react-native-range-slider-expo";

type Props = {};

const Plus = (props: Props) => {
  const [counter, setCounter] = useState(1);
  const openModalProgress = useSharedValue(0);

  useEffect(() => {
    if (counter > 3 && counter <= 4) {
      openModalProgress.value = withTiming(1, { duration: 400 });
    }
  }, [counter]);

  const plusRStyle = useAnimatedStyle(() => {
    const containerHeight = interpolate(
      openModalProgress.value,
      [0, 1],
      [50, 180]
    );
    return { height: containerHeight };
  });

  const Calculator = ({
    setCounter,
  }: {
    setCounter: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={[5, 6, 7, 8, 9, 10]}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={({ pressed }) => [
                  pressed
                    ? [styles.calculatorItem, { opacity: 0.5 }]
                    : styles.calculatorItem,
                ]}
                onLongPress={() => {
                  openModalProgress.value = withTiming(0, {
                    duration: 300,
                  });
                  setCounter(+("1" + item.toString()));
                }}
                onPress={() => {
                  openModalProgress.value = withTiming(0, {
                    duration: 300,
                  });
                  setCounter(item);
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ top: 120, position: "absolute" }}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1555447014-7ead71574544?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bXVnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{ width: width / 2, height: 140, borderRadius: 10 }}
        />
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
              width: 60,
              height: 50,
              backgroundColor: "#EEE",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {counter * 3} $
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: height / 2,
          position: "absolute",
          top: height / 2 - 320,
          justifyContent: "flex-end",
          alignContent: "center",
          alignItems: "center",
          width,
          // backgroundColor: "orange",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              flexDirection: "row",
              width: width / 2,
              justifyContent: "flex-end",
              borderWidth: 1,
              borderColor: "black",
              alignContent: "center",
              alignItems: "flex-end",
              borderRadius: 10,
              overflow: "hidden",
            },
            plusRStyle,
          ]}
        >
          <View>
            <Calculator setCounter={setCounter} />
            <View style={styles.plusMinusContainer}>
              <Pressable
                onPress={() => {
                  if (counter >= 2) {
                    setCounter((prev) => prev - 1);
                  }
                }}
                style={({ pressed }) => [
                  pressed
                    ? [{ opacity: 0.5 }, styles.circleButton]
                    : styles.circleButton,
                ]}
                onLongPress={() => {
                  setCounter(1);
                }}
                // style={styles.circleButton}
              >
                <AntDesign
                  disabled
                  name="minuscircleo"
                  size={34}
                  color="black"
                />
              </Pressable>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <TextInput
                  placeholder={counter.toString()}
                  placeholderTextColor="black"
                  style={{
                    fontSize: 22,
                    width: 40,
                    height: 40,
                    borderWidth: 0.9,
                    borderColor: "black",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  value={counter.toString()}
                  onChangeText={(text) => setCounter(+text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  textAlign={"center"}
                /> */}
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {counter}
                </Text>
              </View>
              <Pressable
                style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
                onLongPress={() => {
                  openModalProgress.value = withTiming(1, { duration: 300 });
                }}
                onPress={() => {
                  setCounter((prev) => prev + 1);
                }}
                // style={styles.circleButton}
              >
                <AntDesign
                  disabled
                  name="pluscircleo"
                  size={34}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
      <View style={{ position: "absolute", top: height / 2 + 120 }}>
        <MedButton
          title="Add to cart"
          width={width / 2}
          borderRadius={10}
          color={"#0461cf"}
        />
        {/* <View style={{ marginTop: 10 }}>
          <MedButton
            onPress={() => {
              setCounter(1);
            }}
            title="Reset"
            width={100}
            borderRadius={10}
            color={myColors.redFavorite}
          />
        </View> */}
      </View>
    </View>
  );
};

export default Plus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  plusMinusContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  calculatorItem: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#EEE",
    margin: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  sliderContainer: {
    height: 100,
    // marginBottom: 10,
    width: width / 2,
    justifyContent: "center",
    alignContent: "center",
  },
});
