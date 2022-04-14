import React from "react";
import styled from "styled-components/native";
import { Button, ButtonText } from "./Button";

const SignUpButtonContainer = styled(Button)`
  border-width: 2px;
  border-color: white;
  border-style: solid;
  background-color: transparent;
`;

function SignUpButton({ onPress }) {
  return (
    <SignUpButtonContainer onPress={onPress}>
      <ButtonText>Sign Up</ButtonText>
    </SignUpButtonContainer>
  );
}

export default SignUpButton;
