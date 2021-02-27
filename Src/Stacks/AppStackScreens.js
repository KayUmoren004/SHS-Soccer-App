import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import { UserContext } from "../Components/Context/UserContext";
import LoadingScreen from "../Screens/AuthScreens/LoadingScreen";

const AppStackScreens = () => {
  const RootStack = createStackNavigator();
  const [user] = useContext(UserContext);
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false }}
      headerMode="none"
    >
      {user.isLoggedIn === null ? (
        <RootStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <RootStack.Screen
          name="App"
          component={MainStackScreens}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreens}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default AppStackScreens;
