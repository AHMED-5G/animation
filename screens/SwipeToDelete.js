//https://www.youtube.com/watch?v=AVS_2nzt8Do
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import { ScrollView } from "react-native-gesture-handler";

const SwipeToDelete = () => {
  const Titles = [
    "Record tutorial",
    "buy pepsi",
    "play assetto corsa ",
    "Record tutorial",
    "buy pepsi",
    "play assetto corsa ",
    "Record tutorial",
    "buy pepsi",
    "play assetto corsa ",
    "Record tutorial",
    "buy pepsi",
    "play assetto corsa ",
  ];

  const Tasks = Titles.map((title, index) => ({
    title,
    index,
  }));
  const [tasks, setTasks] = useState(Tasks);
  const onDismiss = useCallback((task) => {
    setTasks((task) => tasks.filter((item) => item.index !== task.index));
  }, []);
  const scrollRef = useRef();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            task={task}
            //to prevent conflict between PanGestureHandler
            //and scrolling bu scrollView
            //not that require to import scroll view from react-native-gesture-handler
            simultaneousHandlers={scrollRef}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({});
