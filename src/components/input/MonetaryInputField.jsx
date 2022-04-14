import React from "react";
import styled from "styled-components/native";
import {
  InputContainer,
  InputLabel,
  InputBorder,
  StyledInputField,
} from "./InputField";
import { Error } from "./Error";
import { INVALID_AMOUNT } from "../../constants/ErrorMessages";

const StyledContainer = styled(InputContainer)`
  align-self: flex-end;
  margin: 0;
  width: ${(props) => (props.hasLabel ? "100%" : "30%")};
`;

const DollarLabel = styled(InputLabel)`
  color: ${(props) => props.theme.primaryText};
  padding: 3px;
  margin-top: auto;
`;

const StyledBorder = styled(InputBorder)`
  border-bottom-color: ${(props) => (props.error ? "red" : props.theme.hover)};
  flex-direction: row;
  margin: ${(props) => (props.hasLabel ? "10px 0px" : "0")};
`;

function MonetaryInputField(props) {
  const { label, onChange, value, placeholder, isDark, error } = props;

  return (
    <StyledContainer hasLabel={label}>
      {label && <InputLabel> {label} </InputLabel>}
      <StyledBorder error={error} hasLabel={label}>
        <DollarLabel>$ </DollarLabel>
        <StyledInputField
          keyboardType={"decimal-pad"}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          isDark={isDark}
        />
      </StyledBorder>
      {label && error === true && <Error>{INVALID_AMOUNT}</Error>}
    </StyledContainer>
  );
}

export default MonetaryInputField;
