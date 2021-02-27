import React, { useContext, useState, useEffect } from "react";

//Dependencies
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { FirebaseContext } from "../../Components/Context/FirebaseContext";
import { UserContext } from "../../Components/Context/UserContext";
import config from "../../Components/Config/firebase";
import styled from "styled-components";
import firebase from "firebase";
import Colors from "../../Components/Utils/Colors";
import Text from "../../Components/Screen Components/Text";

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

const ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("Stats")
      .get()
      .then(function (querySnapshot) {
        const stats = querySnapshot.docs.map((doc) => doc.data());
        //console.log(stats);
        setStats(stats);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const renderStats = ({ item }) => {
    return (
      <StatsContainer>
        <ProfilePhotoContainer>
          <ProfilePhoto
            source={
              user.profilePhotoUrl === "default"
                ? require("../../../Assets/defaultProfilePhoto.jpeg")
                : { uri: user.profilePhotoUrl }
            }
          />
        </ProfilePhotoContainer>

        <StatsHeader>
          <Text color="#ffffff" medium bold center margin="16px 0 16px 0">
            {user.name}
          </Text>
          <Text color="#ffffff" medium light center>
            {item.number}
          </Text>
        </StatsHeader>

        <StatisticsContainer>
          <StatContainer>
            <Text large bold color="#ffffff">
              {item.goals}
            </Text>
            <Text small light color="#ffffff">
              Goals
            </Text>
          </StatContainer>

          <StatContainer>
            <Text large bold color="#ffffff">
              {item.passesandcrosses}
            </Text>
            <Text small light center color="#ffffff">
              Passes
            </Text>
          </StatContainer>

          <StatContainer>
            <Text large bold color="#ffffff">
              {item.shots}
            </Text>
            <Text small light color="#ffffff">
              Shots
            </Text>
          </StatContainer>

          <StatContainer>
            <Text large bold color="#ffffff">
              {item.fouls}
            </Text>
            <Text small light color="#ffffff">
              Fouls
            </Text>
          </StatContainer>

          <StatContainer>
            <Text large bold color="#ffffff">
              {item.saves}
            </Text>
            <Text small light color="#ffffff">
              Saves
            </Text>
          </StatContainer>
        </StatisticsContainer>
      </StatsContainer>
    );
  };

  const logOut = async () => {
    // const stats = useStats()
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <Container>
      <Stats>
        <FlatList
          data={stats}
          renderItem={renderStats}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
        />
      </Stats>

      <Logout onPress={logOut}>
        <Text medium bold color="#23a8d9">
          Log Out
        </Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #000000;
`;

const StatsHeader = styled.View`
  margin-top: 20px;
`;

const Stats = styled.View``;

const StatisticsContainer = styled.View`
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
  padding: 10px;
`;

const StatsContainer = styled.View`
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;
`;

const StatContainer = styled.View`
  margin: 16px;
`;

const ProfilePhotoContainer = styled.View`
  shadow-opacity: 0.8;
  margin-top: 44px;
  shadow-radius: 30px;
  shadow-color: #d2d2d2;
`;

const ProfilePhoto = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;

const Logout = styled.TouchableOpacity`
  margin-bottom: 32px;
  position: absolute;
  bottom: 0;
`;
export default ProfileScreen;
