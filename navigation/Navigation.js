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
import ScrollViewFromScratch from "../screens/ScrollViewFromScratch";
import RandomizeImages from "../screens/RandomizeImages";
import FlashMessage from "../screens/FlashMessage";
import { EnteringExisting } from "../screens/EnteringExisting";
import DragAndDrop from "../screens/DragAndDrop";
import Draw from "../screens/Draw";
import PanResponder from "../screens/PanResponderView";
import FacebookLike from '../screens/FacebookLike';

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
        name="FacebookLike"
        component={FacebookLike}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PanResponder"
        component={PanResponder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Draw"
        component={Draw}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnteringExisting"
        component={EnteringExisting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DragAndDrop"
        component={DragAndDrop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashMessage"
        component={FlashMessage}
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
