import React from "react";
import styled from "styled-components/native";
import OrangeButton from "./OrangeButton";
import * as ExpenseMessages from "../../constants/ExpenseMessages";

const FixedView = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10px;
  align-self: center;
`;

function AddExpenseButton({ onPress, disabled }) {
  return (
    <FixedView>
      <OrangeButton
        text={ExpenseMessages.ADD_EXPENSE}
        onPress={onPress}
        disabled={disabled}
      />
    </FixedView>
  );
}

export default AddExpenseButton;
