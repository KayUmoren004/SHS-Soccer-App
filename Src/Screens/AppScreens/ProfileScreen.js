import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FirebaseContext } from "../../Components/Context/FirebaseContext";
import { UserContext } from "../../Components/Context/UserContext";

const ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => logOut()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
