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
import moment from "moment";
import Colors from "../../Components/Utils/Colors";

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
    //console.log(...state.data);
    moment.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s ",
        s: "sec",
        m: "%dm",
        mm: "%dm",
        h: "%dh",
        hh: "%dh",
        d: "%dd",
        dd: "%dd",
        M: "a mth",
        MM: "%dmths",
        y: "y",
        yy: "%dy",
      },
      calendar: {
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        lastWeek: "[Last] dddd",
        nextWeek: "[Next] dddd",
        sameElse: "L",
      },
    });
    return (
      <View style={styles.FlatListContainer}>
        <View style={styles.DayContainer}>
          <Text style={styles.DayText}>
            {moment.unix(item.day.seconds).calendar()}
          </Text>
        </View>
        <View style={styles.BodyContainer}>
          <View>
            <Text style={styles.TitleText}>{item.title}</Text>
          </View>
          <View style={styles.SubBody}>
            <Text style={styles.BodyText}>{item.body} </Text>
            <View style={styles.TimeContainer}>
              <Text style={styles.TimeText}>
                {moment.unix(item.timestamp.seconds).fromNow()}
              </Text>
            </View>
          </View>
        </View>
        <Divider style={{ backgroundColor: Colors.inactive }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBlack }}>
      <FlatList
        data={state.data}
        renderItem={renderNotifications}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    backgroundColor: Colors.darkBlack,
    padding: 10,
  },
  DayContainer: {},
  BodyContainer: {},
  SubBody: {
    flexDirection: "row",
  },
  TimeContainer: {
    color: Colors.lightGrey,
  },
  DayText: {
    color: Colors.lightGrey,
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  TitleText: {
    color: Colors.lightGrey,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  BodyText: {
    color: Colors.lightGrey,
  },
  TimeText: {
    color: Colors.mediumGrey,
  },
});

export default NotificationScreen;
