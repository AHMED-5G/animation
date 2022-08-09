//https://www.youtube.com/watch?v=uKdaZG5v3dY
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { width } from "../constants/dimensions";
import { myColors } from "../constants/colors";
import Tab from "../components/mini/Tab";
import { hotels } from "../dummy";
import { Transition, Transitioning } from "react-native-reanimated";
import GridImage from "../components/GridImage";
const RandomizeImages = () => {
  const [selected, setSelected] = useState(0);
  const tRef = useRef();
  const selectTab = (tabIndex) => {
    tRef.current.animateNextTransition();
    setSelected(tabIndex);
  };
  const [myHotels, setMyHotels] = useState(hotels);
  const transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={1000} />
      <Transition.Change />
    </Transition.Together>
  );
  useEffect(() => {
    tRef.current.animateNextTransition();
  }, []);
  const randomizeImages = () => {
    setMyHotels(myHotels.sort(() => 0.5 - Math.random()));
    tRef.current.animateNextTransition();
  };
  return (
    <Transitioning.View
      ref={tRef}
      transition={transition}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 70,
          marginTop: 50,
          width: width - 30,
          marginHorizontal: 15,
          backgroundColor: myColors.grey5,
          borderRadius: 70,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: (width - 30) / 2,
            height: 70,
            backgroundColor: "#BADA55",
            left: !selected ? 0 : null,
            right: selected ? 1 : null,
          }}
        />
        <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(0)}>
          <Tab icon="camera-reverse-outline" isSelected={!selected} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(1)}>
          <Tab icon="grid" isSelected={selected} />
        </TouchableOpacity>
      </View>
      {selected == 0 ? (
        <View style={styles.imageContainer}>
          {myHotels.map((hotel, index) => (
            <GridImage
              key={hotel.id}
              image={hotel.image}
              width={width / 2 - 20}
            />
          ))}
        </View>
      ) : (
        <View style={styles.imageContainer}>
          {myHotels.map((hotel, index) => (
            <GridImage
              key={hotel.id}
              image={hotel.image}
              width={width / 4 - 20}
            />
          ))}
        </View>
      )}
      <TouchableWithoutFeedback onPress={() => randomizeImages(hotels)}>
        <View
          style={{
            position: "absolute",
            height: 70,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#BADA55",
          }}
        >
          <Text style={{ fontSize: 25 }}>Randomize Images</Text>
        </View>
      </TouchableWithoutFeedback>
    </Transitioning.View>
  );
};

export default RandomizeImages;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
