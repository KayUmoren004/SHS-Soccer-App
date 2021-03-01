import React, { useState, useContext, useEffect } from "react";

//Dependencies
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
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
  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection("notifications")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        //console.log(data);
        setState({
          data: data,
        });
      });
  };

  const renderNotifications = ({ item }) => {
    return (
      <View>
        <View>
          <Text>{item.day}</Text>
        </View>
        <View>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
          <Text>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#000", alignContent: "center" }}
    >
      <Container>
        <FlatList
          data={state.data}
          renderItem={renderNotifications}
          keyExtractor={(item) => item.id}
        />
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
