import React from "react";
import { View, TouchableOpacity } from "react-native";
import { myColors } from "../../constants/colors";
import { height } from "../../constants/dimensions";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../SearchBar";
const EmptyHeader = ({...props }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: height / 4,
        marginVertical: -40,
      }}
    >
      <StatusBar />
      <View
        style={{
          backgroundColor: myColors.primary,
          opacity: 0.35,
          borderRadius: 100,
          height: 170,
          width: 170,
          marginVertical: -60,
          marginLeft: 34,
          position: "absolute",
        }}
      />
      <View
        style={{
          backgroundColor: myColors.primary,
          opacity: 0.35,
          borderRadius: 100,
          height: 170,
          width: 170,
          marginVertical: -30,
          marginLeft: -60,
          position: "absolute",
        }}
      />
      {props.searchBar ? (
        <View
          style={{
            height: 40,
            width: 200,
            marginVertical: 80,
            marginLeft: 120,
            // position: "absolute",
          }}
        >
          <SearchBar setSearchText={props.setSearchText} />
        </View>
      ) : null}
    </View>
  );
};

export default EmptyHeader;
