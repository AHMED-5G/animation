import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import SkeletonLoader from "expo-skeleton-loader";
import { height, width } from "../constants/dimensions";

const AvatarLayout = ({ size = 100, style }) => (
  <SkeletonLoader>
    <SkeletonLoader.Container style={[{ flexDirection: "row" }, style]}>
      <SkeletonLoader.Item
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          marginRight: 20,
        }}
      />
      <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
        <SkeletonLoader.Item
          style={{ width: 220, height: 20, marginBottom: 5 }}
        />
        <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
      </SkeletonLoader.Container>
    </SkeletonLoader.Container>
  </SkeletonLoader>
);

const PostLayout = () => (
  <SkeletonLoader
    style={{ marginVertical: 10 }}
    boneColor="#EEE"
    highlightColor="#721516"
    duration={1000}
  >
    <AvatarLayout style={{ marginBottom: 10 }} />

    <SkeletonLoader.Item
      style={{ marginTop: 50, width, height: height / 3.5, marginVertical: 10 }}
    />
  </SkeletonLoader>
);

const numberOfPosts = new Array(2).fill(null);

export default function Skeleton() {
  return (
    <View style={styles.container}>
      {numberOfPosts.map((_, i) => (
        <PostLayout key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    padding: 10,
  },
});
