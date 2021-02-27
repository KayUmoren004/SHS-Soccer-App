import React from "react";

//Dependencies
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Components/Utils/Colors";

//Screens
import FeedScreen from "../Screens/AppScreens/FeedScreen";
import GamesScreen from "../Screens/AppScreens/GamesScreen";
import NotificationScreen from "../Screens/AppScreens/NotificationScreen";
import Standings from "../Screens/AppScreens/Standings";
import ProfileScreen from "../Screens/AppScreens/ProfileScreen";

//Stack Navigator Header Name
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  switch (routeName) {
    case "Notifications":
      return "Notifications";
    case "Standings":
      return "Suburban Council Standings";
    case "Home":
      return "Feed";
    case "Profile":
      return "Profile";
    case "Games":
      return "Games Schedule";
  }
}

const MainStackScreens = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  const MainStack = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: Colors.black,
      paddingBottom: 12,
      borderTopWidth: 0,
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "ios-home";

      switch (route.name) {
        case "Notifications":
          iconName = "ios-notifications";
          break;

        case "Standings":
          iconName = "ios-reorder-four-sharp";
          break;

        case "Feed":
          iconName = "ios-home";
          break;

        case "Profile":
          iconName = "ios-person";
          break;

        case "Games":
          iconName = "ios-football";
          break;

        default:
          iconName = "ios-home";
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? Colors.white : Colors.inactive}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      initialRouteName="Feed"
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name="Games" component={GamesScreen} />
      <MainStack.Screen name="Standings" component={Standings} />
      <MainStack.Screen name="Feed" component={FeedScreen} />
      <MainStack.Screen name="Notifications" component={NotificationScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;

const styles = StyleSheet.create({});
