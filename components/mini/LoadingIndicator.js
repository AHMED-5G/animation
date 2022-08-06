import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { myColors } from "../../constants/colors";
const LoadingIndicator = ({...props}) => {
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size={42} color={myColors.sky} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
