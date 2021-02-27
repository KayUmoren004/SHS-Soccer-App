import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import OnBoarding from "../Screens/AuthScreens/OnBoarding";
import SignUpScreen from "../Screens/AuthScreens/SignUpScreen";
import SignInScreen from "../Screens/AuthScreens/SignInScreen";
const AuthStackScreens = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
      <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
      <AuthStack.Screen name="Sign In" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreens;
