import { StyleSheet, View } from "react-native";
import React from "react";
import { DataSourceParam, SkFont, Text } from "@shopify/react-native-skia";

type Props = { i: number; j: number; font: SkFont };

const Symbol = ({ font }: Props) => {
//   const x = i * SYMBOL;
  return <Text font={font} text={""}  
  />;
};

export default Symbol;

const styles = StyleSheet.create({});
