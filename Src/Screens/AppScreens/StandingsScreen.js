import React, { Component } from "react";

//Dependencies
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../../Components/Screen Components/Text";
import styled from "styled-components";
import config from "../../Components/Config/firebase";
import { Divider } from "react-native-paper";
import firebase from "firebase";

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

class StandingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standingImage: [],
    };
  }

  /*componentDidMount() {
    db.collection("standingsImage")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        this.setState({ scb: data });
      });
  }*/

  render() {
    return (
      <Container>
        <StandingImage source={require("../../../Assets/standings.png")} />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StandingImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default StandingsScreen;
