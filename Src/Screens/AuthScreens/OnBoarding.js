import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../../Components/Utils/Colors";
import SignUpButton from "../../Components/Screen Components/SignUpButton";
import SignInButton from "../../Components/Screen Components/SignInButton";
import AsyncStorage from "@react-native-community/async-storage";

const OnBoarding = ({ navigation }) => {
  const checkOnBoarding = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
    } catch (error) {
      console.log("Error @setItem: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.TextContainer}>
        <Text style={styles.Greeting}>HELLO</Text>
        <Text style={styles.RegularText}>Choose an Option to Get Started</Text>
      </View>

      <View style={styles.ButtonContainer}>
        <SignInButton
          onPress={() => navigation.navigate("Auth", { screen: "Sign In" })}
        />
        <SignUpButton
          onPress={() => navigation.navigate("Auth", { screen: "Sign Up" })}
        />
      </View>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  ButtonContainer: {
    marginVertical: 30,
    flex: 1,
    justifyContent: "flex-end",
  },
  TextContainer: {
    margin: 10,
  },
  Greeting: {
    color: colors.white,
    fontSize: 54,
    fontWeight: "400",
  },
  RegularText: {
    color: colors.white,
  },
});
