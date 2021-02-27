import React, { VoidFunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SocialLogin from "./Forms/SocialLogin";

const Footer = ({ onPress, title = "", action = "", ...props }) => {
  return (
    <>
      <SocialLogin
        GooglePressed={() => console.info("Google Pressed")}
        FacebookPressed={() => console.info("Facebook Pressed")}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "#fff" }} {...props}>
          {`${title}`}{" "}
        </Text>
        <TouchableOpacity onPress={onPress} {...props}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "skyblue",
            }}
          >
            {action}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Footer;
