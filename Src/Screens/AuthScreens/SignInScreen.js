import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components";

//App Component
import Container from "../../Components/Screen Components/Container";

//Context
import { UserContext } from "../../Components/Context/UserContext";
import { FirebaseContext } from "../../Components/Context/FirebaseContext";

//dependencies
import Colors from "../../Components/Utils/Colors";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);

    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;

      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        name: userInfo.name,
        Email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={{ padding: 36 }}>
        <Text
          style={{
            color: Colors.lightGrey,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
            //marginBottom: 25,
          }}
        >
          Welcome back
        </Text>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 25,
            color: Colors.lightGrey,
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "200",
            fontSize: 15,
          }}
        >
          Use your credentials below and login to your account
        </Text>
        <Auth>
          <AuthContainer>
            <AuthTitle>Email Address</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              // autoFocus={true}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>Password</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              textColor="#ffffff"
              value={password}
            />
          </AuthContainer>
        </Auth>

        <SignInContainer onPress={signIn} disabled={loading}>
          {loading ? (
            <Loading />
          ) : (
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          )}
        </SignInContainer>

        <SignUp onPress={() => navigation.navigate("Sign Up")}>
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              //fontWeight: "bold",
            }}
          >
            New to Varsity Soccer?{" "}
            <Text
              style={{
                color: Colors.red,
                //textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
          </Text>
        </SignUp>
      </View>
    </Container>
  );
};

const Auth = styled.View`
  margin: 64px 32px 32px;
`;
const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #fff;
  border-bottom-width: 0.5px;
  height: 48px;
  color: #fff;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #e9446a;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin: 16px;
`;

export default SignInScreen;
