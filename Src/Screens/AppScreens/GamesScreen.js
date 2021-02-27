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

class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    db.collection("games")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        //console.log(data);
        this.setState({ games: data });
      });
  }

  renderPost = ({ item }) => (
    <GamesContainer>
      <GamesHeaderContainer>
        <Text bold medium color="#fff">
          {item.name}
        </Text>
        <Text medium semi color="#9bd1fa">
          {item.date}
        </Text>
      </GamesHeaderContainer>

      <Games>
        <TeamLogos>
          <HomeTeamLogo
            source={{ uri: item.homeimage }}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text heavy large color="#fff">
            {item.homescore}
          </Text>
          <VSLogo
            source={{ uri: item.vsimage }}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text heavy large color="#fff">
            {item.awayscore}
          </Text>
          <AwayTeamLogo
            source={{ uri: item.awayimage }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TeamLogos>

        <Divider
          style={{
            backgroundColor: "#87ceeb",
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <Teams>
          <Text medium color="#fff">
            {item.game}
          </Text>
        </Teams>

        <Divider
          style={{
            backgroundColor: "#87ceeb",
            marginTop: 10,
          }}
        />

        <TimeAndLocation>
          <Text heavy medium color="#fff">
            {item.time}
          </Text>
          <Text heavy medium color="#fff">
            {item.location}
          </Text>
        </TimeAndLocation>
      </Games>
    </GamesContainer>
  );

  render() {
    return (
      <Container>
        <FeedContainer>
          <Feed
            data={this.state.games}
            renderItem={this.renderPost}
            ItemSeparatorComponent={() => (
              <Divider
                style={{
                  backgroundColor: "#fff",
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </FeedContainer>

        <StatusBar barStyle="light-content" />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #000000;
`;

const FeedContainer = styled.View``;

const StatusBar = styled.StatusBar``;

const Feed = styled.FlatList``;

const GamesContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #000000;
  border-radius: 6px;
  padding: 8px;
`;

const GamesHeaderContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const Games = styled.View``;

const TeamLogos = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const HomeTeamLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

const VSLogo = styled.Image`
  width: 70px;
  height: 70px;
`;

const AwayTeamLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

/*const TeamScores = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;*/

const Teams = styled.View`
  margin-bottom: 10px;
  align-items: center;
`;

const TimeAndLocation = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default GamesScreen;
