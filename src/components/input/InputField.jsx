import React from "react";
import styled from "styled-components/native";

export const InputContainer = styled.View`
  width: 100%;
  margin: 10px 0px;
`;

export const InputLabel = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  font-family: "RobotoCondensed_400Regular";
  font-size: 20px;
`;

export const InputBorder = styled.View`
  border-bottom-color: ${(props) => props.theme.hover};
  border-bottom-width: 2px;
  margin: 10px 0px;
`;

export const StyledInputField = styled.TextInput`
  width: 100%;
  font-size: 21px;
  font-family: "SourceSansPro_400Regular";
  padding: 3px;
  color: ${(props) => (props.isUserForm ? "black" : props.theme.primaryText)};
  background-color: ${(props) =>
    props.isDark ? props.theme.cardBackground : "transparent"};
`;

function InputField(props) {
  const {
    label,
    onChange,
    value,
    placeholder,
    secure,
    isDark,
    isUserForm,
  } = props;

  return (
    <InputContainer>
      <InputLabel> {label} </InputLabel>
      <InputBorder>
        <StyledInputField
          secureTextEntry={secure}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          isDark={isDark}
          isUserForm={isUserForm}
          autoCapitalize={label === "Email" ? "none" : "sentences"}
          keyboardType={label === "Email" ? "email-address" : "default"}
        />
      </InputBorder>
    </InputContainer>
  );
}

export default InputField;
