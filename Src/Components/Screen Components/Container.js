import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../Utils/Colors";

const { width, height: wheight } = Dimensions.get("window");
const aspectRatio = 200 / 300;
const height = width * aspectRatio;

function propTypes(props) {
  children: propTypes.node;
  //footer: propTypes.node;
  name: propTypes.string;
}

const Container = (props) => {
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <View style={styles.container}>
        <View style={{ backgroundColor: Colors.white }}>
          <View style={styles.ColorView}>
            <Image
              source={require("../../../Assets/shs-logo.png")}
              style={{
                height: "50%",
                width: "50%",
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.overlay}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              top: -height * 0.61,
              backgroundColor: Colors.white,
            }}
          />
          <View style={styles.ContentContainer}>{props.children}</View>
        </View>
        {/*<View
          style={{
            backgroundColor: Colors.black,
            paddingBottom: 30,
            paddingTop: 15,
          }}
        >
          {props.footer}
        </View>*/}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    height: wheight,
  },
  ColorView: {
    //borderBottomLeftRadius: 25,
    overflow: "hidden",
    height: height * 0.61,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    overflow: "hidden",
  },
  ContentContainer: {
    flex: 1,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: Colors.black,
    overflow: "hidden",
  },
});

export default Container;
