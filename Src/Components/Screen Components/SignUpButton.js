import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../Utils/Colors";

const SignUpButton = ({ onPress, ...props }) => {
  return (
    <View>
      <TouchableOpacity style={styles.Container} onPress={onPress} {...props}>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.white }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 32,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    borderRadius: 25,
  },
});
