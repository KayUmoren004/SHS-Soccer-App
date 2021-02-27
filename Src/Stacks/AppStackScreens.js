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
import Modal from "../Screens/AppScreens/StatsScreen";
import Colors from "../Components/Utils/Colors";

const AppStackScreens = () => {
  const RootStack = createStackNavigator();
  const MainStack = createStackNavigator();

  const MainStackScreen = ({ navigation }) => {
    return (
      <MainStack.Navigator initialRouteName="Feed" mode="modal">
        <MainStack.Screen
          name="Stats"
          component={Modal}
          options={{
            headerStyle: { backgroundColor: Colors.black },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
            title: "Team Stats",
            Enabled: true,
          }}
        />

        <MainStack.Screen
          name="Feed"
          component={MainStackScreens}
          options={{
            headerStyle: { backgroundColor: Colors.black },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Stats")}
                style={{ justifyContent: "center", alignContent: "center" }}
              >
                <Entypo
                  name="text-document-inverted"
                  size={30}
                  color="#fff"
                  style={{ marginRight: 20, marginBottom: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </MainStack.Navigator>
    );
  };
  const [user] = useContext(UserContext);
  return (
    <RootStack.Navigator screenOptions={{ Enabled: true }} headerMode="none">
      {user.isLoggedIn === null ? (
        <RootStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <RootStack.Screen
          name="App"
          component={MainStackScreen}
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
