import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Component,
  Image,
  Button,
} from "react-native";
import Text2 from "../../Components/Screen Components/Text";
import styled from "styled-components";
import firebase from "firebase";
import config from "../../Components/Config/firebase";
import { navigation } from "@react-navigation/native";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    db.collection("StatsImages")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        this.setState({ images: data });
      });
  }

  renderPost = ({ item }) => (
    <StatsContainer>
      <View>
        <Image
          source={{ uri: item.image }}
          resizeMethod="resize"
          resizeMode="contain"
          style={{ width: "100%", height: 300 }}
        />
      </View>
    </StatsContainer>
  );

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#222222",

          //alignContent: "center",
          // justifyContent: "center",
        }}
      >
        <StatsContainer>
          <Stats
            data={this.state.images}
            renderItem={this.renderPost}
            //onRefresh={() => this.onRefresh()}
            //refreshing={this.state.isFetching}
            keyExtractor={(item) => item.id}
            style={{ backgroundColor: "#222222" }}
          />
        </StatsContainer>
      </SafeAreaView>
    );
  }
}

export default StatsScreen;

const StatsContainer = styled.View``;

const StatusBar = styled.StatusBar``;

const Stats = styled.FlatList``;

const styles = StyleSheet.create({});
