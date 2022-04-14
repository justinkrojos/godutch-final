import React from "react";
import styled, { useTheme } from "styled-components/native";
import { getExpenseStatus } from "../../helpers";

const Container = styled.View`
  width: 100%;
  background: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(props) => props.colour};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
`;

const OweText = styled.Text`
  font-family: "RobotoCondensed_400Regular";
  font-size: 14px;
  color: ${(props) => props.colour};
`;

const MoneyText = styled.Text`
  font-family: "RobotoCondensed_700Bold";
  font-size: 23px;
  color: ${(props) => props.colour};
`;

function OweInfoBox(props) {
  const theme = useTheme();
  const { moneyAmount } = props;
  const status = getExpenseStatus(moneyAmount, theme.primaryText);

  return (
    <Container colour={status.colour}>
      <OweText colour={status.colour}>{status.message}</OweText>
      <MoneyText colour={status.colour}>${status.total}</MoneyText>
    </Container>
  );
}

export default OweInfoBox;
