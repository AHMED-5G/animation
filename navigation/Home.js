import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import MedButton from "../components/mini/MedButton";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <EmptyHeader />
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Facebook Like"
          onPress={() => {
            navigation.navigate("FacebookLike");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Pan Responder"
          onPress={() => {
            navigation.navigate("PanResponder");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Drag And Drop"
          onPress={() => {
            navigation.navigate("DragAndDrop");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Draw"
          onPress={() => {
            navigation.navigate("Draw");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Entering Existing"
          onPress={() => {
            navigation.navigate("EnteringExisting");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Flash Message"
          onPress={() => {
            navigation.navigate("FlashMessage");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Randomize Images"
          onPress={() => {
            navigation.navigate("RandomizeImages");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          title="Scroll View From Scratch"
          onPress={() => {
            navigation.navigate("ScrollViewFromScratch");
          }}
          fontSize={20}
        />
      </View>
      <View style={{ marginTop: 10 }}>
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
      <View style={{ marginTop: 10 }}>
        <MedButton
          fontSize={20}
          title="Ripple Effect Animation"
          onPress={() => {
            navigation.navigate("RippleEffectAnimation");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          fontSize={20}
          title="Square Inside Circle"
          onPress={() => {
            navigation.navigate("SquareInsideCircle");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          fontSize={20}
          title="Double Tap Like Instagram"
          onPress={() => {
            navigation.navigate("DoubleTapLikeInstagram");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          fontSize={20}
          title="Image Double Tap"
          onPress={() => {
            navigation.navigate("ImageDoubleTap");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MedButton
          fontSize={20}
          title="Swipe To Delete"
          onPress={() => {
            navigation.navigate("SwipeToDelete");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
