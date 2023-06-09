import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  Platform,
  ImageSourcePropType,
  Animated,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import { Indicator } from "react-native-image-slider-banner/src/indicator";
import {
  DataType,
  PropsTypes,
} from "react-native-image-slider-banner/src/PropsTypes";
import { SliderHeader } from "react-native-image-slider-banner/src/sliderHeader";
// import { styles } from "react-native-image-slider-banner/src/style";

import { Image, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
const Os = Platform.OS;
interface MyCustomProps extends PropsTypes {
  onItemChangedWithIndex?: (itemData: DataType, index: number) => void;
  requestedIndex?: number;
  navigate?: () => void;
}

export const ImageSlider = ({
  data = [],
  showHeader = false,
  headerRightComponent = null,
  headerLeftComponent = null,
  headerCenterComponent = null,
  headerStyle = {},
  previewImageContainerStyle = {},
  previewImageStyle = {},
  caroselImageStyle = {},
  caroselImageContainerStyle = {},
  timer = 2000,
  autoPlay = false,
  showIndicator = true,
  activeIndicatorStyle = {},
  inActiveIndicatorStyle = {},
  indicatorContainerStyle = {},
  onItemChanged = (itemData) => {},
  onItemChangedWithIndex = (itemData, index) => {},
  localImg = false,
  onClick = (item: DataType, index: number) => {},
  preview = true,
  children,
  closeIconColor = "#000",
  blurRadius = 50,
  requestedIndex = 0,
  navigate = () => {},
}: MyCustomProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const imageW = width * 0.7;
  const imageH = imageW * 1.54;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageViewer, setImageViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef(null);
  const timerRef = useRef<any>(null);
  const onViewRef = React.useRef(({ viewableItems }) => {
    // Use viewable items in state or as intended
    if (viewableItems.length > 0) {
      let index = viewableItems[0].index;
      onItemChanged(viewableItems[0].item);
      onItemChangedWithIndex(viewableItems[0].item, index);
      setSelectedIndex(index);
    }
  });

  // if (requestedIndex ) {
  useEffect(() => {
    setCurrentIndex(requestedIndex);
    // setSelectedIndex(requestedIndex);
    changeSliderListIndexByRequest(requestedIndex);
  }, [requestedIndex]);
  // }

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    if (autoPlay) {
      if (data.length > 0) startAutoPlay(imageViewer ? true : false);
    }
  }, []);

  useEffect(() => {
    if (!imageViewer) {
      if (autoPlay) {
        if (data.length > 0) startAutoPlay(imageViewer ? true : false);
      }
    } else {
      clearTimeout(timerRef?.current);
    }
  }, [currentIndex, imageViewer]);

  const changeSliderListIndexByRequest = (newIndex: number) => {
    if (slider.current) {
      setCurrentIndex(newIndex);
      // @ts-ignore
      slider.current.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const changeSliderListIndex = () => {
    if (slider.current) {
      if (currentIndex == data.length - 1) {
        setCurrentIndex(0);
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      } else {
        setCurrentIndex(currentIndex + 1);
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }
    }
  };

  const startAutoPlay = (isViewer: boolean) => {
    if (!imageViewer) {
      ((viewer) => {
        let viewBool = viewer;
        timerRef.current = setTimeout(() => {
          if (!viewBool) {
            changeSliderListIndex();
          }
        }, timer);
      })(isViewer);
    }
  };

  const previewImage = () => {
    return (
      <Modal
        visible={imageViewer}
        onDismiss={() => setImageViewer(!imageViewer)}
        onRequestClose={() => setImageViewer(!imageViewer)}
      >
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((val, ind) => {
            const inputRange = [
              (ind - 1) * width,
              ind * width,
              (ind + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-${ind}`}
                // @ts-ignore
                source={localImg ? val.img : { uri: val.img }}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={blurRadius}
              />
            );
          })}
        </View>

        <Animated.FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          initialScrollIndex={selectedIndex}
          pinchGestureEnabled={true}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              // @ts-ignore
              slider.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.previewImageContainerStyle,
                  previewImageContainerStyle,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    setImageViewer(!imageViewer);
                  }}
                  style={{
                    position: "absolute",
                    top: Os == "ios" ? 30 : 5,
                    left: 5,
                  }}
                >
                  {/* <Icon
                    onPress={() => setImageViewer(!imageViewer)}
                    name="close"
                    size={34}
                    color={closeIconColor}
                  /> */}
                </TouchableOpacity>
                <Image
                  // @ts-ignore
                  source={localImg ? item.img : { uri: item.img }}
                  style={[styles.previewImageStyle, previewImageStyle]}
                />
              </View>
            );
          }}
        />
      </Modal>
    );
  };
  return (
    <View>
      {imageViewer && previewImage()}
      {showHeader && (
        <SliderHeader
          headerStyle={headerStyle}
          rightComponent={headerRightComponent}
          leftComponent={headerLeftComponent}
          centerComponent={headerCenterComponent}
        />
      )}
      <Animated.FlatList
        ref={slider}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        pinchGestureEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        initialScrollIndex={selectedIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            // flatList.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={[caroselImageContainerStyle]}>
              <>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (navigate) {
                      navigate();
                    } else {
                      if (!preview) {
                        onClick(item, index);
                      } else {
                        setSelectedIndex(index);
                        setImageViewer(!imageViewer);
                      }
                    }
                  }}
                >
                  <Image
                    // @ts-ignore
                    source={localImg ? item.img : { uri: item.img }}
                    style={[styles.caroselImageStyle, caroselImageStyle]}
                  />
                </TouchableOpacity>
                {children}
              </>
            </View>
          );
        }}
      />
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
        }}
      >
        {showIndicator && (
          <Indicator
            data={data}
            currenIndex={selectedIndex}
            indicatorContainerStyle={indicatorContainerStyle}
            activeIndicatorStyle={activeIndicatorStyle}
            inActiveIndicatorStyle={inActiveIndicatorStyle}
          />
        )}
      </View>
    </View>
  );
};
// const width = Dimensions.get('screen').width
const styles = StyleSheet.create({
  caroselImageStyle: {
    width: width,
    // resizeMode: "contain",
    height: 300,
  },
  previewImageContainerStyle: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImageStyle: {
    width: width,
    resizeMode: "contain",
    height: 400,
  },
});
