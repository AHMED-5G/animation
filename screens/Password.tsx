import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FormTextInput from "../components/newMini/FormTextInput";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  containsNumber,
  containsSpecialChars,
  containsUppercase,
  hasLowerCase,
} from "../src/components/utils/functions";
import { width } from "../constants/dimensions";

type Props = {};

const Password = (props: Props) => {
  const mainWidth = width * 0.7;
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const hintsContainerHeight = 38;
  const hintsContainerWidth = width / 2;
  const openHintsContainerProgress = useSharedValue(0);
  const openUpperCaseContainerProgress = useSharedValue(1);
  const openSixContainerProgress = useSharedValue(1);
  const openSymbolsContainerProgress = useSharedValue(1);
  const openNumbersContainerProgress = useSharedValue(1);
  const moveToRightProgress = useSharedValue(0);

  const openHintsContainerRStyle = useAnimatedStyle(() => {
    const toHeight = interpolate(
      openHintsContainerProgress.value,
      [0, 1],
      [0, hintsContainerHeight],
      Extrapolate.CLAMP
    );
    return { height: toHeight };
  });
  const toRightRStyle = useAnimatedStyle(() => {
    const toRight = interpolate(
      moveToRightProgress.value,
      [0, 1],
      [10, width / 2 - 30],
      Extrapolate.CLAMP
    );
    return { left: toRight };
  });

  const upperCaseContainerRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(
      openUpperCaseContainerProgress.value,
      [1, 0],
      [0, hintsContainerHeight],
      Extrapolate.CLAMP
    );

    return { top: toTop };
  });

  const sixContainerRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(
      openSixContainerProgress.value,
      [1, 0],
      [0, hintsContainerHeight],
      Extrapolate.CLAMP
    );

    return { top: toTop };
  });

  const numbersContainerRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(
      openNumbersContainerProgress.value,
      [1, 0],
      [0, hintsContainerHeight],
      Extrapolate.CLAMP
    );

    return { top: toTop };
  });

  const symbolsContainerRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(
      openSymbolsContainerProgress.value,
      [1, 0],
      [0, hintsContainerHeight],
      Extrapolate.CLAMP
    );

    return { top: toTop };
  });

  const openHintsContainer = () => {
    openHintsContainerProgress.value = withSpring(1);
  };

  const closeHintsContainer = () => {
    openHintsContainerProgress.value = withSpring(0);
  };

  const openHintUpperCaseContainer = () => {
    openUpperCaseContainerProgress.value = withSpring(1);
  };

  const closeHintUpperCaseContainer = () => {
    openUpperCaseContainerProgress.value = withSpring(0);
  };

  const openSymbolsContainer = () => {
    openSymbolsContainerProgress.value = withSpring(1);
  };

  const closeSymbolsContainer = () => {
    openSymbolsContainerProgress.value = withSpring(0);
  };

  const openNumbersContainer = () => {
    openNumbersContainerProgress.value = withSpring(1);
  };

  const closeNumbersContainer = () => {
    openNumbersContainerProgress.value = withSpring(0);
  };

  useEffect(() => {
    // console.log(containsUppercase("A"));

    //uppercase
    if (containsUppercase(password) == true && hasLowerCase(password)) {
      closeHintUpperCaseContainer();
    } else {
      openHintUpperCaseContainer();
    }
//Ad_g5 del @Ad_5g
    //symbols
    if (!containsSpecialChars(password) == true) {
      openSymbolsContainer();
    } else {
      closeSymbolsContainer();
    }

    //length
    if (password.length >= 6) {
      openSixContainerProgress.value = withSpring(0);
    } else {
      openSixContainerProgress.value = withSpring(1);
    }

    //numbers
    if (!containsNumber(password)) {
      openNumbersContainer();
    } else {
      closeNumbersContainer();
    }

    moveToRightProgress.value = withSpring(password.length / 10 / 2);
  }, [password]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            height: 0,
            width: mainWidth,
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
          openHintsContainerRStyle,
        ]}
      >
        <Animated.View
          style={[styles.hintContainer, sixContainerRStyle, toRightRStyle]}
        >
          <Text style={styles.hintText}>{password.length}/6</Text>
        </Animated.View>

        <Animated.View
          style={[styles.hintContainer, numbersContainerRStyle, toRightRStyle]}
        >
          <Text style={styles.hintText}>123</Text>
        </Animated.View>
        <Animated.View
          style={[styles.hintContainer, symbolsContainerRStyle, toRightRStyle]}
        >
          <Text style={styles.hintText}>#$@</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.hintContainer,
            upperCaseContainerRStyle,
            toRightRStyle,
          ]}
        >
          <Text style={styles.hintText}>Aa</Text>
        </Animated.View>
      </Animated.View>
      <View>
        <FormTextInput
          mainContainerStyle={{}}
          placeholder="Password"
          onFocus={() => {
            setIsFocused(true);
            openHintsContainer();
          }}
          width={mainWidth}
          onBlur={() => {
            setIsFocused(false);
            closeHintsContainer();
          }}
          value={password}
          setText={(text) => {
            setPassword(text);
          }}
          keyboardType="default"
        />
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
  },
  hintContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    minWidth: 20,
    position: "absolute",
    left: 10,
    top: 0,
    width: 50,
    backgroundColor: "#cfebb6",
    // height: 40,
  },
  hintText: {
    fontSize: 22,
    fontWeight: "400",
    margin: 5,
  },
});
