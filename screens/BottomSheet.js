//https://www.youtube.com/watch?v=KvRqsRwpwhY

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetComponent from "../components/BottomSheetComponent";
import { StatusBar } from "expo-status-bar";

const BottomSheet = () => {
  const myRef = useRef(null);
  const onPress = useCallback(() => {
    myRef?.current?.scrollTo();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheetComponent ref={myRef} />
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 25,
    opacity: 0.6,
  },
});
