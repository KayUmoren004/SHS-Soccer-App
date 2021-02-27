import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";
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
import Form from "../../Components/Screen Components/Forms/Form";
import FormField from "../../Components/Screen Components/Forms/FormField";
import FormButton from "../../Components/Screen Components/Forms/FormButton";
import FormErrorMessage from "../../Components/Screen Components/Forms/FormErrorMessage";
import IconButton from "../../Components/Screen Components/IconButton";
import Footer from "../../Components/Screen Components/Footer";

//Validate Name, Email, and Password
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match Password")
    .required("Confirm Password is required"),
});

const SignUpScreen = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState("");
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

  function handlePasswordVisibility() {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === "eye") {
      setConfirmPasswordIcon("eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "eye-off") {
      setConfirmPasswordIcon("eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }
  const footer = (
    <Footer
      title="Already have an account?"
      action="Sign In here!"
      onPress={() => navigation.navigate("Sign In")}
    />
  );
  return (
    <Container {...{ footer }}>
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
          Let us know what your email, and your password
        </Text>
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePhoto: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(user) => signUp(user)}
        >
          <ProfilePhotoContainer onPress={addProfilePhoto}>
            {profilePhoto ? (
              <ProfilePhoto source={{ uri: profilePhoto }} />
            ) : (
              <DefaultProfilePhoto>
                <AntDesign name="plus" size={24} color="#ffffff" />
              </DefaultProfilePhoto>
            )}
          </ProfilePhotoContainer>

          <FormField
            name="name"
            leftIcon="account"
            textContentType="name"
            placeholder="Enter name"
            autoFocus={true}
          />
          <FormField
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormField
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={confirmPasswordVisibility}
            textContentType="password"
            rightIcon={confirmPasswordIcon}
            handlePasswordVisibility={handleConfirmPasswordVisibility}
          />
          <FormButton title={"Register"} />
          {<FormErrorMessage error={registerError} visible={true} />}
        </Form>
        {/*<IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={Colors.white}
          size={30}
          onPress={() => navigation.goBack()}
        />*/}
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

export default SignUpScreen;
