import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MedButton from "../components/mini/MedButton";
import { myColors } from "../constants/colors";
import { height } from "../constants/dimensions";

const Flash = ({ message, ...props }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          fontSize: 22,
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

const FlashMessage = () => {
  const [messages, setMessages] = useState([]);
  const addMessage = () => {
    setMessages((previous) => [
      ...previous,
      "new message " + Math.floor(Math.random(1, 100) * 100),
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {messages.map((message) => {
          return (
            <Flash
              message={message}
              onHide={() => {
                setMessages((messages) =>
                  messages.filter(
                    (currentMessage) => currentMessage !== message
                  )
                );
              }}
            />
          );
        })}
      </View>
      <View
        style={{
          position: "absolute",
          top: height - 130,
          marginLeft: 10,
        }}
      >
        <MedButton
          color={myColors.secondary}
          width={200}
          height={70}
          borderRadius={12}
          title={"Add Message"}
          onPress={addMessage}
        />
      </View>
    </View>
  );
};

export default FlashMessage;

const styles = StyleSheet.create({});
