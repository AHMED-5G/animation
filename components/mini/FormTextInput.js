import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { height, width } from "../../constants/dimensions";
import { myColors } from "../../constants/colors";

const FormTextInput = ({ ...props }) => {
  const [validationMessages, setValidationMessages] = useState("");
  useEffect(() => {
    if (props.value) {
      if (props.validations && props.validations !== undefined) {
        setValidationMessages(props.validations);
      } else {
        setValidationMessages();
      }
    } else {
      setValidationMessages();
    }
  }, [props.value]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
          width: props.width ? props.width : width / 2,
          height: props.height ? props.height : 50,
          alignItems: "center",
          justifyContent: "space-between",
          alignContent: "space-between",
          borderWidth: validationMessages ? 1 : null,
          borderColor: validationMessages ? myColors.redPlus : null,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "space-between",
          }}
        >
          <View>
            <Text>{props.icon}</Text>
          </View>
          <KeyboardAvoidingView
            behavior='height'
          >
            <TextInput
              placeholder={props.placeholder}
              style={{
                width: props.width ? props.width : width / 2,
              }}
              onChangeText={(text) => {
                props.setText(text);
              }}
              value={props.value}
              autoCapitalize="none"
              secureTextEntry={props.secure}
              keyboardType={props.keyboardType}
              onSubmitEditing={props.onSubmitEditing}
              maxLength={props.maxLength}
              multiline={props.multiline}
            />
          </KeyboardAvoidingView>
        </View>
        <View>
          <Text>{props.rightIcon}</Text>
        </View>
      </View>
      {validationMessages ? (
        <View>
          <Text>{validationMessages}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({});
