import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../../Components/Utils/Colors";
import { Text } from "react-native";
import LottieView from "lottie-react-native";

import { UserContext } from "../../Components/Context/UserContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);

  useEffect(() => {
    setTimeout(async () => {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }, 500);
  }, []);
  return (
    <Container>
      <Text style={{ fontSize: 32, color: colors.white }}>
        Schenectady Varsity Soccer{" "}
      </Text>

      <LottieView
        source={require("../../../Assets/LoadingAnimation.json")}
        autoPlay
        loop
        style={{ width: "100%" }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #222222;
`;

export default LoadingScreen;
