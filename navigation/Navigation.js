// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HotelFlatList from "../screens/HotelFlatList";
import Home from "./Home";
import SquareInLoop from "../screens/SquareInLoop";
import RippleEffectAnimation from "../screens/RippleEffectAnimation";
import SquareInsideCircle from "../screens/SquareInsideCircle";
import DoubleTapLikeInstagram from "../screens/DoubleTapLikeInstagram";
import ImageDoubleTap from "../screens/ImageDoubleTap";
import SwipeToDelete from "../screens/SwipeToDelete";
import ScrollViewFromScratch from '../screens/ScrollViewFromScratch';
import RandomizeImages from '../screens/RandomizeImages';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RandomizeImages"
        component={RandomizeImages}
        options={{ headerShown: false }}
      />   
         <Stack.Screen
        name="ScrollViewFromScratch"
        component={ScrollViewFromScratch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotelFlatList"
        component={HotelFlatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SquareInLoop"
        component={SquareInLoop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RippleEffectAnimation"
        component={RippleEffectAnimation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SquareInsideCircle"
        component={SquareInsideCircle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoubleTapLikeInstagram"
        component={DoubleTapLikeInstagram}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageDoubleTap"
        component={ImageDoubleTap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SwipeToDelete"
        component={SwipeToDelete}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;

// export default Navigation;
