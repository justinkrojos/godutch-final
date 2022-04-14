import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/Logo";
import SignUpButton from "../components/buttons/SignUpButton";
import LoginButton from "../components/buttons/OrangeButton";

const StyledView = styled(LinearGradient)`
  height: 100%;
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
`;

const H1 = styled.Text`
  color: white;
  font-size: 72px;
  font-family: "PlayfairDisplay_700Bold";
`;

const H2 = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  font-size: 26px;
  font-family: "RobotoCondensed_300Light_Italic";
  margin-top: 10px;
`;

function LandingPage({ navigation }) {
  return (
    <StyledView colors={["#051821", "#0D394E"]}>
      <Section>
        <H1>Go</H1>
        <H1>Dutch</H1>
        <H2>Make Payments Easy.</H2>
      </Section>
      <Logo width={"200px"} height={"200px"} />
      <Section>
        <SignUpButton onPress={() => navigation.navigate("SignUp")} />
        <LoginButton
          onPress={() => navigation.navigate("Login")}
          text={"Login"}
        />
      </Section>
    </StyledView>
  );
}

export default LandingPage;
