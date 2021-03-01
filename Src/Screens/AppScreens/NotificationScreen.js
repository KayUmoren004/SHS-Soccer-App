import React, { useState, useContext, useEffect, useRef } from "react";

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
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Colors from "../../Components/Utils/Colors";
import Constants from "expo-constants";

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

const NotificationScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  //const firebase = useContext(FirebaseContext);
  const notificationListener = useRef();
  const responseListener = useRef();
  const uid = firebase.auth().currentUser.uid;
  const [state, setState] = useState({
    data: [],
    expoPushToken: "",
    notification: false,
  });

  useEffect(() => {
    getData();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        registerForPushNotificationsAsync();
      }
    });
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

  const registerForPushNotificationsAsync = async (user) => {
    const { existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      alert("NOTIFICATIONS NEED TO BE ENABLED SO AS TO RECEIVE MESSAGES!");
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there

    await db.collection("users").doc(uid).update({ Expo_Push_Token: token });
    //call the push notification
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
        {/*<View style={styles.DayContainer}>
          <Text style={styles.DayText}>
            {moment.unix(item.day.seconds).calendar()}
          </Text>
        </View>*/}
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
        <Divider
          style={{ backgroundColor: Colors.inactive, marginVertical: 10 }}
        />
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
