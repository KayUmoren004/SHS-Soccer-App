import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

//Screens
import OnBoarding from "../Screens/AuthScreens/OnBoarding";
import SignUpScreen from "../Screens/AuthScreens/SignUpScreen";
import SignInScreen from "../Screens/AuthScreens/SignInScreen";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const AuthStackScreens = () => {
  const AuthStack = createStackNavigator();
  const ScreenStack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  const AuthScreens = ({ navigation }) => {
    return (
      <ScreenStack.Navigator headerMode="none">
        <ScreenStack.Screen name="Sign Up" component={SignUpScreen} />
        <ScreenStack.Screen name="Sign In" component={SignInScreen} />
      </ScreenStack.Navigator>
    );
  };

  const RootStackScreen = ({ navigation }) => {
    return (
      <AuthStack.Navigator headerMode="none">
        {loading ? (
          <AuthStack.Screen name="Loading" component={Loading} />
        ) : viewedOnboarding ? (
          <AuthStack.Screen name="Auth" component={AuthScreens} />
        ) : (
          <>
            <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
            <AuthStack.Screen name="Auth" component={AuthScreens} />
          </>
        )}
      </AuthStack.Navigator>
    );
  };

  useEffect(() => {
    checkOnBoarding();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default AuthStackScreens;
