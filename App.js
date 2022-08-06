//https://www.youtube.com/watch?v=TZWPHJVRedI
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import { hotels } from "./dummy";
import HotelCard from "./src/components/HotelCard";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
