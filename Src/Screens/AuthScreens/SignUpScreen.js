import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

//App Component
import Container from "../../Components/Screen Components/Container";

//Context
import { UserContext } from "../../Components/Context/UserContext";
import { FirebaseContext } from "../../Components/Context/FirebaseContext";

//dependencies
import Colors from "../../Components/Utils/Colors";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(false);
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1.0,
      });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch {
      console.log("Error @pickImage: ", error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();

    if (status !== "granted") {
      alert("We need permission to access your camera roll.");

      return;
    }

    pickImage();
  };

  const signUp = async () => {
    setLoading(true);

    const user = { name, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);

      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("Error @signUp: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <View style={{ padding: 35 }}>
        <Text
          style={{
            color: Colors.lightGrey,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
            //marginBottom: 25,
          }}
        >
          Create Account
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
          Let us know your email, and your password
        </Text>

        <ProfilePhotoContainer onPress={addProfilePhoto}>
          {profilePhoto ? (
            <ProfilePhoto source={{ uri: profilePhoto }} />
          ) : (
            <DefaultProfilePhoto>
              <AntDesign name="plus" size={24} color="#ffffff" />
            </DefaultProfilePhoto>
          )}
        </ProfilePhotoContainer>

        <Auth>
          <AuthContainer>
            <AuthTitle>Name</AuthTitle>
            <AuthField
              autoCapitalize="words"
              autoCorrect={true}
              autoFocus={true}
              onChangeText={(name) => setName(name)}
              value={name}
            />
          </AuthContainer>

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

        <SignUpContainer onPress={signUp} disabled={loading}>
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
              Sign Up
            </Text>
          )}
        </SignUpContainer>

        <SignUp onPress={() => navigation.navigate("Sign In")}>
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              //fontWeight: "bold",
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                color: Colors.red,
                //textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          </Text>
        </SignUp>
      </View>
    </Container>
  );
};

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-self: center;
  margin-bottom: 16px;
  overflow: hidden;
`;

const DefaultProfilePhoto = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProfilePhoto = styled.Image`
  flex: 1;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
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

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #2163f6;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin: 16px;
`;

export default SignUpScreen;
