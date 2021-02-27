import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Yup from "yup";

//App Component
import Container from "../../Components/Screen Components/Container";

//dependencies
import Colors from "../../Components/Utils/Colors";
import Form from "../../Components/Screen Components/Forms/Form";
import FormField from "../../Components/Screen Components/Forms/FormField";
import FormButton from "../../Components/Screen Components/Forms/FormButton";
import FormErrorMessage from "../../Components/Screen Components/Forms/FormErrorMessage";
import IconButton from "../../Components/Screen Components/IconButton";
import Footer from "../../Components/Screen Components/Footer";

//Validate Email and Password
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
});

const SignInScreen = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  function handlePasswordVisibility() {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here!"
      onPress={() => navigation.navigate("Register")}
    />
  );
  return (
    <Container {...{ footer }}>
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
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          /*onSubmit={value => handleOnLogin(values)}*/
        >
          <FormField
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
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

          <FormButton title={"Sign In"} />
          {<FormErrorMessage error={loginError} visible={true} />}
          <View style={styles.footerButtonContainer}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPasswordButtonText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>*/}
          </View>
        </Form>
      </View>
    </Container>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
