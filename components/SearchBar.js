import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LightHeader from "./mini/LightHeader";

const SearchBar = ({ setSearchText, ...props }) => {
  const navigation = useNavigation();
  let clearInput = () => {};
  return (
    <View>
      <View>
        <View
          style={{
            // marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FAFAFA",
              opacity: 0.93,
              width: 251,
              height: 36,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="search"
                size={16}
                color="black"
                style={{ padding: 8 }}
              />
              <TextInput
                placeholder="Search"
                style={{ padding: 8 }}
                onChangeText={(val) => {
                  setSearchText(val);
                }}
                autoCapitalize="none"
                ref={(input) => {
                  clearInput = input;
                }}
              />
            </View>
            <MaterialIcons
              onPress={() => {
                clearInput.clear();
                setSearchText(null);
              }}
              name="cancel"
              size={18}
              color="#3C3C43"
              style={{ padding: 8, opacity: 0.6 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
