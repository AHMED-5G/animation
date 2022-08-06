import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { width } from "../../constants/dimensions";

const MyDropDown = ({ ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={[styles.dropdown, props.isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
          search={props.search}
          searchPlaceholder="Search..."
          maxHeight={200}
          labelField={props.labelField}
          valueField={props.valueField}
          placeholder={!props.isFocus ? props.placeholder : "..."}
          value={props.value}
          onFocus={() => props.setIsFocus(true)}
          onBlur={() => props.setIsFocus(false)}
          // onChange={(item) => {
          //   props.setText(item.id);
          //   props.setIsFocus(false);
          // }}
          onChange={props.onChange}
          renderLeftIcon={() => <Text>{props.icon}</Text>}
        />
      </View>
    </View>
  );
};

export default MyDropDown;

const styles = StyleSheet.create({
  dropdownContainer: {
    // padding: 16,
  },
  dropdown: {
    height: 50,
    marginTop: 5,
    borderColor: "gray",
    // borderWidth: 0.1,
    borderRadius: 10,
    width: width / 2,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    marginLeft: 16,
    fontSize: 14,
    opacity: 0.5,
  },
  selectedTextStyle: {
    marginLeft: 16,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
