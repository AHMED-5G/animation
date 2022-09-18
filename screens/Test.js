import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Test = () => {
  const data = [
    { client: A, cost: 20, date: new Date("12/09/2022") },
    { client: B, cost: 30, date: new Date("12/09/2022") },
    { client: C, cost: 30, date: new Date("13/09/2022") },
    { client: D, cost: 40, date: new Date("13/09/2022") },
  ];
  console.log(data);
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
