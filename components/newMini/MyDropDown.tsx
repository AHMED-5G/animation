// import {
//   Dimensions,
//   ImageStyle,
//   StyleProp,
//   StyleSheet,
//   Text,
//   TextProps,
//   TextStyle,
//   View,
//   ViewStyle,
// } from "react-native";
// import React, {
//   Dispatch,
//   FunctionComponent,
//   ReactNode,
//   SetStateAction,
// } from "react";
// import { Dropdown } from "react-native-element-dropdown";
// const height = Dimensions.get("screen").height;
// const width = Dimensions.get("screen").width;

// // interface DropDown {
// //   data: any[];
// //   isFocus?: boolean;
// //   search?: boolean;
// //   icon?: ReactNode;
// //   dropDownStyle: StyleProp<ViewStyle>;
// //   labelField: string;
// //   valueField: string;
// // }

// type DropDown = {
//   testID?: string;
//   itemTestIDField?: string;
//   style?: StyleProp<ViewStyle>;
//   containerStyle?: StyleProp<ViewStyle>;
//   placeholderStyle?: StyleProp<TextStyle>;
//   selectedTextStyle?: StyleProp<TextStyle>;
//   selectedTextProps?: TextProps;
//   itemContainerStyle?: StyleProp<ViewStyle>;
//   itemTextStyle?: StyleProp<TextStyle>;
//   inputSearchStyle?: StyleProp<TextStyle>;
//   iconStyle?: StyleProp<ImageStyle>;
//   maxHeight?: number;
//   fontFamily?: string;
//   iconColor?: string;
//   activeColor?: string;
//   data: any[];
//   value?: any | null;
//   placeholder?: string;
//   labelField: string;
//   valueField: string;
//   search?: boolean;
//   searchPlaceholder?: string;
//   disable?: boolean;
//   autoScroll?: boolean;
//   showsVerticalScrollIndicator?: boolean;
//   dropdownPosition?: "auto" | "top" | "bottom";
//   flatListProps?: any;
//   keyboardAvoiding?: boolean;
//   statusBarIsTranslucent?: boolean;
//   backgroundColor?: string;
//   onChange: (item: any) => void;
//   renderLeftIcon?: () => JSX.Element | null | undefined;
//   renderRightIcon?: () => JSX.Element | null | undefined;
//   renderItem?: (
//     item: any,
//     selected?: boolean
//   ) => JSX.Element | null | undefined;
//   renderInputSearch?: (
//     onSearch: (text: string) => void
//   ) => JSX.Element | null | undefined;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   searchQuery?: (keyword: string, labelValue: string) => boolean;
//   onChangeText?: (search: string) => void;
//   isFocus: boolean;
//   setIsFocus: Dispatch<SetStateAction<boolean>>;
//   icon?: JSX.Element;
//   leftIconStyle?: StyleProp<TextStyle>;
// };

// const MyDropDown: FunctionComponent<DropDown> = ({ ...props }) => {
//   return (
//     <View style={styles.dropdownContainer}>
//       <Dropdown
//         style={[
//           styles.dropdown,
//           props.isFocus && { borderColor: "blue", borderWidth: 1 },
//           props.containerStyle,
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={props.data}
//         search={props.search}
//         searchPlaceholder="Search..."
//         maxHeight={200}
//         labelField={props.labelField}
//         valueField={props.valueField}
//         placeholder={!props.isFocus ? props.placeholder : "..."}
//         value={props.value}
//         onFocus={() => props.setIsFocus(true)}
//         onBlur={() => props.setIsFocus(false)}
//         onChange={props.onChange}
//         renderLeftIcon={() => (
//           <Text style={props.leftIconStyle}>{props.icon}</Text>
//         )}
//       />
//     </View>
//   );
// };

// export default MyDropDown;

// const styles = StyleSheet.create({
//   dropdownContainer: {
//     // padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     marginTop: 5,
//     borderColor: "gray",
//     // borderWidth: 0.1,
//     borderRadius: 10,
//     width: width / 2,
//     backgroundColor: "white",
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: "absolute",
//     backgroundColor: "white",
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     marginLeft: 16,
//     fontSize: 14,
//     opacity: 0.5,
//   },
//   selectedTextStyle: {
//     marginLeft: 16,
//     fontSize: 14,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });
