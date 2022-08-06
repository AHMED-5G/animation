import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import MedButton from "../components/mini/MedButton";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <EmptyHeader />
      <View>
        <MedButton
          title="Hotel Flat List"
          onPress={() => {
            navigation.navigate("HotelFlatList");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Square In Loop"
          onPress={() => {
            navigation.navigate("SquareInLoop");
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
