import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import EmptyHeader from "../components/mini/EmptyHeader";
import MedButton from "../components/mini/MedButton";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const screens = [

    {
      title: '3D Card',
      navigateName: 'threeDCard'
    },
    {
      title: 'Skia Play Ground',
      navigateName: 'SkiaPlayGround'
    },
    {
      title: 'Water Slide',
      navigateName: 'WaterSlide'
    },
    {
      title: 'Arc Slider',
      navigateName: 'ArcSlider'

    },
    {
      title: 'Graph',
      navigateName: 'Graph'

    },
    {
      title: 'Path',
      navigateName: 'Path'
    },
    {
      title: 'Password',
      navigateName: 'Password'
    },
    {
      title: 'Remove All Items',
      navigateName: 'RemoveAllItems'
    },
    {
      title: 'Plus Slide',
      navigateName: 'PlusSlide'
    },
    {
      title: 'Plus',
      navigateName: 'Plus'
    },
    {
      title: 'Skeleton',
      navigateName: 'Skeleton'
    },
    {
      title: 'Clock',
      navigateName: 'Clock'
    },
    {
      title: 'Bottom Sheet',
      navigateName: 'BottomSheet'
    },
    {
      title: 'Bubble',
      navigateName: 'Bubble'
    },
    {
      title: 'Dive In Circle',
      navigateName: 'DiveInCircle'
    },
    {
      title: 'Perspective Menu',
      navigateName: 'PerspectiveMenu'
    },
    {
      title: 'Color Piker',
      navigateName: 'ColorPiker'
    },
    {
      title: 'Whats Up Reanimated',
      navigateName: 'WhatsUpReanimated'
    },
    {
      title: 'Log In With Image',
      navigateName: 'LogInWithImage'
    },
    {
      title: 'Facebook Like',
      navigateName: 'FacebookLike'
    },
    {
      title: 'Pan Responder',
      navigateName: 'PanResponder'
    },
    {
      title: 'Drag And Drop',
      navigateName: 'DragAndDrop'
    },
    {
      title: 'Draw',
      navigateName: 'Draw'
    },
    {
      title: 'Entering Existing',
      navigateName: 'EnteringExisting'
    },
    {
      title: 'Flash Message',
      navigateName: 'FlashMessage'
    },
    {
      title: 'ScrollView From Scratch',
      navigateName: 'ScrollViewFromScratch'
    },
    {
      title: 'Hotel FlatList',
      navigateName: 'HotelFlatList'
    },
    {
      title: 'Square In Loop',
      navigateName: 'SquareInLoop'
    },
    // {
    //   title: 'RippleEffectAnimation',
    //   navigateName: 'RippleEffectAnimation'
    // }, 
    {
      title: 'Square Inside Circle',
      navigateName: 'SquareInsideCircle'
    },
    {
      title: 'Double Tap Like Instagram',
      navigateName: 'DoubleTapLikeInstagram'
    },
    {
      title: 'Image Double Tap',
      navigateName: 'ImageDoubleTap'
    },
    // {
    //   title: 'SwipeToDelete',
    //   navigateName: 'SwipeToDelete'
    // },
  ]
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <EmptyHeader />
      {screens.map((screen, index) =>
        <View
          key={index}
          style={{ marginTop: 10 }}>
          <MedButton
            title={screen.title}
            onPress={() => {
              navigation.navigate(screen.navigateName);
            }}
            fontSize={20}
          />
        </View>)
      }
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
  },
});
