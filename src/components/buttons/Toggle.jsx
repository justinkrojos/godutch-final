import React from "react";
import styled from "styled-components/native";
import { Button, ButtonText } from "./Button";
import * as GroupActions from "../../constants/GroupActions";

const ButtonContainer = styled(Button)`
  width: 50%;
  border-radius: 0px;
  background-color: ${(props) =>
    props.selected ? props.theme.toggleSelected : props.theme.toggleUnselected};
`;

const ToggleView = styled.View`
  display: flex;
  flex-direction: row;
`;

function ToggleButton({ text, action, onToggle }) {
  const selected = text === action;
  return (
    <ButtonContainer onPress={() => onToggle(text)} selected={selected}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}

function Toggle({ action, setAction }) {
  return (
    <ToggleView>
      <ToggleButton
        text={GroupActions.CREATE}
        action={action}
        onToggle={setAction}
      />
      <ToggleButton
        text={GroupActions.JOIN}
        action={action}
        onToggle={setAction}
      />
    </ToggleView>
  );
}

export default Toggle;
