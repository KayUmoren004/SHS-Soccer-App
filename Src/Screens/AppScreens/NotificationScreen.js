import React, { useState, useContext } from "react";

//Dependencies
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../../Components/Screen Components/Text";
import styled from "styled-components";
import config from "../../Components/Config/firebase";
import { Divider } from "react-native-paper";
import firebase from "firebase";
import { UserContext } from "../../Components/Context/UserContext";
import { FirebaseContext } from "../../Components/Context/FirebaseContext";

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

const NotificationScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#000", alignContent: "center" }}
    >
      <Container>
        <Text center color="#fff" title>
          Notifications
        </Text>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default NotificationScreen;
