import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppStackScreens from "./Src/Stacks/AppStackScreens";

//Context Providers
import { UserProvider } from "./Src/Components/Context/UserContext";
import { FirebaseProvider } from "./Src/Components/Context/FirebaseContext";

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
