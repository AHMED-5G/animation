import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const width = Dimensions.get("screen").width;
export const height = Dimensions.get("screen").height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export const figmaScreenHeight = 850;
export const figmaScreenWidth = 392;

const heightWithRatioOfWindowHeight = (givenHeight: number): number => {
  return (givenHeight / figmaScreenHeight) * windowHeight;
};

const heightWithRatioOfScreenHeight = (givenHeight: number): number => {
  return (givenHeight / figmaScreenHeight) * height;
};

const widthWithRatioOfWindowWidth = (givenWidth: number): number => {
  return (givenWidth / figmaScreenWidth) * windowWidth;
};

const widthWithRatioOfScreenWidth = (givenWidth: number): number => {
  return (givenWidth / figmaScreenWidth) * width;
};

const fontRatio = (givenFontSize: number): number => {
  return (
    ((givenFontSize / figmaScreenHeight) * height +
      (givenFontSize / figmaScreenWidth) * width) /
    2
  );
};

const circularRatio = (givenSize: number): number => {
  return (
    ((givenSize / figmaScreenHeight) * height +
      (givenSize / figmaScreenWidth) * width) /
    2
  );
};

const averageRatio = (givenSize: number): number => {
  return (
    ((givenSize / figmaScreenHeight) * height +
      (givenSize / figmaScreenWidth) * width) /
    2
  );
};

export {
  heightWithRatioOfWindowHeight as hwrowh,
  heightWithRatioOfScreenHeight as hwrosh,
  widthWithRatioOfWindowWidth as wwroww,
  widthWithRatioOfScreenWidth as wwrosw,
  fontRatio,
  circularRatio,
  averageRatio,
};
