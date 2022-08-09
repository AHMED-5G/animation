import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { myColors } from "../../constants/colors";

const Tab = ({ icon, isSelected }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Ionicons
        name={icon}
        color={isSelected ? "black" : myColors.grey4}
        size={30}
      />
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({});
