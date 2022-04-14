import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import Card, { NameText, MoneyText } from "./Card";
import { getExpenseStatus, roundToTwoDP, getMoneyText } from "../../helpers";
import OrangeButton from "../buttons/OrangeButton";
import {
  paybackAllExpenses,
  paybackExpensesPerGroup,
} from "../../firebase/ExpenseManager";
import { useStateValue } from "../../StateProvider";

const ListItemTextBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TransactionsView = styled.View`
  padding-top: 10px;
`;

const RepayView = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`;

const TransactionsText = styled.Text`
  font-family: "SourceSansPro_400Regular_Italic";
  font-size: 18px;
  margin-bottom: 14px;
  color: ${(props) => props.theme.primaryText};
`;

const OweList = ({ oweArray, handleRepay, renderPage }) => {
  return oweArray.map((oweItem) => (
    <OweListItem
      key={oweItem.userId}
      name={oweItem.name}
      amount={roundToTwoDP(oweItem.netAmount)}
      transactions={oweItem.transactions}
      handleRepay={handleRepay}
      payee={oweItem.userId}
      renderPage={renderPage}
    />
  ));
};

const TransactionsList = ({ transactions }) => {
  const theme = useTheme();

  return transactions.map((transaction) => (
    <ListItemTextBox key={transactions.indexOf(transaction)}>
      <TransactionsText>{transaction.expenseName}</TransactionsText>
      <MoneyText colour={theme.primaryText}>
        {getMoneyText(roundToTwoDP(transaction.amount))}
      </MoneyText>
    </ListItemTextBox>
  ));
};
export default OweList;

export function OweListItem({
  handleRepay,
  name,
  amount,
  transactions,
  payee,
  renderPage,
}) {
  const status = getExpenseStatus(amount);
  const [expanded, setExpanded] = useState(false);
  const [{ user }] = useStateValue();

  const onPressRepay = () => {
    if (handleRepay) {
      paybackExpensesPerGroup(user.uid, payee, handleRepay).then(() =>
        renderPage()
      );
    } else {
      paybackAllExpenses(user.uid, payee).then(() => renderPage());
    }
  };
  return (
    <Card onPress={() => setExpanded(!expanded)}>
      <ListItemTextBox>
        <NameText>{name}</NameText>
        <MoneyText colour={status.colour}>${status.total}</MoneyText>
      </ListItemTextBox>
      {expanded && (
        <TransactionsView>
          <TransactionsList transactions={transactions} />
          <RepayView>
            {amount < 0 && (
              <OrangeButton text="Repay" scaled={33} onPress={onPressRepay} />
            )}
          </RepayView>
        </TransactionsView>
      )}
    </Card>
  );
}
