import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { CheckBox } from "react-native";
import { InputLabel } from "./InputField";
import MonetaryInputField from "./MonetaryInputField";
import { isFloat, getMoneyText, roundToTwoDP } from "../../helpers";

const SplitTypeContainer = styled.View`
  width: 100%;
  margin: 10px 0px;
`;

const LabelSection = styled.View`
  flex-direction: row;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
`;

const StyledInputLabel = styled(InputLabel)`
  color: ${(props) => props.theme.primaryText};
`;

const PayeeBoxContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.primaryText};
  margin-top: 10px;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

function PayeeBox({ payee, splitEqual, recordAmount }) {
  const [amount, onChangeAmount] = useState("");

  useEffect(() => {
    if (isFloat(amount)) {
      recordAmount(amount);
    } else {
      recordAmount(0);
    }
  }, [amount]);

  return (
    <PayeeBoxContainer>
      <StyledInputLabel>{payee}</StyledInputLabel>
      {!splitEqual && (
        <MonetaryInputField
          onChange={onChangeAmount}
          value={amount}
          isDark={true}
          placeholder={"0.00"}
          error={amount && !isFloat(amount)}
        />
      )}
    </PayeeBoxContainer>
  );
}

export default function SplitTypeForm({
  payees,
  size,
  amount,
  setDistributions,
  setDistributionError,
  user,
}) {
  const [splitEqual, setSplitEqual] = useState(true);
  const [amounts, setAmounts] = useState([]);
  const [difference, setDifference] = useState(0);

  function roundAmountsToTwoDP(amounts) {
    const amountsCopy = amounts.map(function (item) {
      return { userId: item.userId, amount: roundToTwoDP(item.amount) };
    });
    return amountsCopy;
  }

  useEffect(() => {
    var total = amounts.reduce(function (prev, cur) {
      return parseFloat(prev || 0) + parseFloat(cur.amount || 0);
    }, 0);
    setDifference(roundToTwoDP(parseFloat(amount)) - roundToTwoDP(total));
    setDistributions(roundAmountsToTwoDP(amounts));
  }, [amounts]);

  useEffect(() => {
    setDistributionError(difference !== 0);
  }, [difference]);

  useEffect(() => {
    if (splitEqual) {
      var amountsCopy = [];
      payees.map((p) => {
        amountsCopy = [
          ...amountsCopy,
          { userId: p.userId, amount: parseFloat(amount) / size },
        ];
        setAmounts(amountsCopy);
      });
    } else {
      setAmounts([]);
    }
  }, [, splitEqual]);

  return (
    <SplitTypeContainer>
      <LabelSection>
        <InputLabel> Payee(s) </InputLabel>
        <StyledInputLabel>
          {difference < 0
            ? "You have over-budgeted"
            : getMoneyText(roundToTwoDP(difference)) + " remaining"}
        </StyledInputLabel>
      </LabelSection>

      <PayeeBox
        payee={"You"}
        splitEqual={splitEqual}
        recordAmount={(val) => {
          setAmounts([
            ...amounts.filter((a) => a.userId !== user),
            { userId: user, amount: parseFloat(val) },
          ]);
        }}
      />

      {payees
        .filter((payee) => payee.userId !== user)
        .map((payee) => (
          <PayeeBox
            key={payee.userId}
            payee={payee.name}
            splitEqual={splitEqual}
            recordAmount={(val) => {
              setAmounts([
                ...amounts.filter((a) => a.userId !== payee.userId),
                { userId: payee.userId, amount: parseFloat(val) },
              ]);
            }}
          />
        ))}
      <LabelSection justifyContent="flex-end">
        <InputLabel onPress={() => setSplitEqual(!splitEqual)}>
          {splitEqual ? "Split unequally?" : "Split equally?"}
        </InputLabel>
      </LabelSection>
    </SplitTypeContainer>
  );
}
