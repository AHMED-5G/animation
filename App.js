//https://www.youtube.com/watch?v=TZWPHJVRedI
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import { hotels } from "./dummy";
import HotelCard from "./src/components/HotelCard";
import React, { useEffect } from "react";

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 120 }}>
        <Animated.FlatList
          onMomentumScrollEnd={(e) => {
            setActiveCardIndex(Math.round(e.nativeEvent.contentOffset.x / 200));
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          horizontal={true}
          data={hotels}
          renderItem={({ item, index }) => (
            <HotelCard
              item={item}
              activeCardIndex={activeCardIndex}
              index={index}
              scrollX={scrollX}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 30,
            paddingLeft: 80,
            paddingRight: 80,
          }}
          snapToInterval={200}
        />
      </View>
    </View>
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
