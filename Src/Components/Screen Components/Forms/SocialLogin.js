import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const Google = ({ onPressGoogle, ...props }) => (
  <TouchableOpacity onPress={onPressGoogle} {...props}>
    <Svg width={20} height={20} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <Path fill="none" d="M0 0h48v48H0z" />
    </Svg>
  </TouchableOpacity>
);

const Facebook = ({ onPressFacebook, ...props }) => (
  <TouchableOpacity onPress={onPressFacebook} {...props}>
    <Svg viewBox="0 0 50 50" width={20} height={20}>
      <Path
        d="M32 11h5c.55 0 1-.45 1-1V3.262a.998.998 0 00-.926-.996C35.484 2.152 32.375 2 30.141 2 24 2 20 5.68 20 12.367V19h-7c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h7v19c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V28h7.223a.998.998 0 00.992-.89l.777-7A.998.998 0 0037 19h-8v-5a3 3 0 013-3zm0 0"
        fill="#3b5998"
      />
    </Svg>
  </TouchableOpacity>
);

const SocialIcon = ({ children, ...props }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: 25 * 2,
        height: 25 * 2,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
      }}
    >
      {children}
    </View>
  );
};

const SocialLogin = ({ GooglePressed, FacebookPressed, ...props }) => {
  return (
    <View>
      <View
        style={{ flexDirection: "row", justifyContent: "center" }}
        {...props}
      >
        <SocialIcon>
          <Google onPressGoogle={GooglePressed} />
        </SocialIcon>

        <SocialIcon>
          <Facebook onPressFacebook={FacebookPressed} />
        </SocialIcon>
      </View>
    </View>
  );
};

export default SocialLogin;
