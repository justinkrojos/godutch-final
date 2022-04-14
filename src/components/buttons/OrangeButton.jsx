import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Button, ButtonText } from "./Button";
import { LinearGradient } from "expo-linear-gradient";

const ButtonContainer = styled(Button)`
  width: ${(props) => (props.scaled ? `${props.scaled}%` : "100%")};
  shadow-color: black;
  shadow-opacity: 0.32;
  shadow-radius: 5.46px;
  background: ${(props) => props.theme.toggleUnselected};
  elevation: 9;
`;

const Background = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function OrangeButton(props) {
  const theme = useTheme();
  const { onPress, text, disabled, scaled } = props;
  return (
    <ButtonContainer
      onPress={disabled ? () => {} : onPress}
      activeOpacity={disabled && 1}
      scaled={scaled}
    >
      {disabled ? (
        <ButtonText>{text}</ButtonText>
      ) : (
        <Background
          colors={[theme.secondaryText, theme.secondaryGradient]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <ButtonText>{text}</ButtonText>
        </Background>
      )}
    </ButtonContainer>
  );
}

export default OrangeButton;
