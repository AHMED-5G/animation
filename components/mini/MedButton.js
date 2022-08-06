import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { myColors } from "../../constants/colors";

import LoadingIndicator from './LoadingIndicator';
const MedButton = ({ ...props }) => {
  return (
    <View>
      {!props.loading ? (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: props.disabled
                  ? myColors.grey4
                  : props.color
                  ? props.color
                  : myColors.main,
                width: props.width ? props.width : 244,
                height: props.height ? props.height : 55,
                borderRadius: props.borderRadius ? props.borderRadius : 30,

              },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: props.fontSize ? props.fontSize : 28,
                  },
                ]}
              >
                {props.title}
              </Text>
            </View>
            <View style={{ marginLeft: 4 }}>
              <Text>{props.icon}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 244,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    flexDirection: "row",
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MedButton;
