import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const LightHeader = ({ ...props }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: 40,
        position: "absolute",
        marginVertical: 40,
        marginLeft: 20,
        zIndex: 1,
      }}
    >
      {/* <StatusBar /> */}
      {props.back && (
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      {props.drawer && (
        <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
          <Ionicons
            name="menu"
            size={24}
            color="black"
            style={{ padding: 4, marginLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LightHeader;

const styles = StyleSheet.create({});
