import React from "react";
import { Picker } from "react-native";
import styled from "styled-components/native";
import { InputLabel, InputBorder } from "./InputField";

const PickerContainer = styled.View`
  width: 100%;
  margin: 10px 0px;
`;

const StyledInputBorder = styled(InputBorder)`
  background-color: ${(props) => props.theme.cardBackground};
`;

const StyledPicker = styled.Picker`
  color: ${(props) => props.theme.primaryText};
`;

export default function StyledPickerForm({ value, options, setValue }) {
  return (
    <PickerContainer>
      <InputLabel> Group </InputLabel>
      <StyledInputBorder>
        <StyledPicker
          mode="dialog"
          selectedValue={value}
          onValueChange={(val) => setValue(val)}
        >
          <Picker.Item label={"Select a group"} value={0} />
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={
                option.groupName !== "" ? option.groupName : "Select a group"
              }
              value={option.groupId}
            />
          ))}
        </StyledPicker>
      </StyledInputBorder>
    </PickerContainer>
  );
}
