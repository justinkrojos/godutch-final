import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "./Logo";
import { Dimensions } from "react-native";

const BackgroundContainer = styled.View`
  height: 300px;
  width: 100%;
  transform: scaleX(2);
  border-bottom-start-radius: 200px;
  border-bottom-end-radius: 200px;
  overflow: hidden;
  margin-bottom: 50px;
`;

const InnerBackground = styled(LinearGradient)`
  flex: 1;
  transform: scaleX(0.5);
  align-items: center;
  justify-content: space-between;
  padding: 12% 0px;
`;

const StyledLogo = styled(Logo)`
  z-index: 5;
`;

const LoginHeading = styled.Text`
  color: white;
  font-size: 40px;
  font-family: "PlayfairDisplay_700Bold";
  z-index: 5;
`;

const windowWidth = Dimensions.get("window").width;

function LoginBackground({ heading }) {
  return (
    <BackgroundContainer>
      <InnerBackground colors={["#051821", "#0C3C53"]}>
        <StyledLogo
          width={"150px"}
          height={"150px"}
          windowwidth={windowWidth}
        />
        <LoginHeading>{heading}</LoginHeading>
      </InnerBackground>
    </BackgroundContainer>
  );
}

export default LoginBackground;
