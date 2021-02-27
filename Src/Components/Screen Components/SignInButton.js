import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../Utils/Colors";

const SignInButtom = ({ onPress, ...props }) => {
  return (
    <View>
      <TouchableOpacity style={styles.Container} onPress={onPress} {...props}>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.white }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInButtom;

const styles = StyleSheet.create({
  Container: {
    margin: 32,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red,
    borderRadius: 25,
  },
});
