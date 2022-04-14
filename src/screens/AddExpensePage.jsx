import React, { useState, useEffect } from "react";
import InputField from "../components/input/InputField";
import Page, { Heading, PageContent } from "../components/page/Page";
import StyledPickerForm from "../components/input/StyledPickerForm";
import SplitTypeForm from "../components/input/SplitTypeForm";
import styled from "styled-components/native";
import { Alert, ScrollView } from "react-native";
import MonetaryInputField from "../components/input/MonetaryInputField";
import { isFloat, getMoneyText, roundToTwoDP } from "../helpers";
import AddExpenseButton from "../components/buttons/AddExpenseButton";
import { useStateValue } from "../StateProvider";
import { createExpense, getAddExpenseScreen } from "../firebase/ExpenseManager";
import { getHomeScreenData } from "../firebase/ExpenseManager";
import { getGroups } from "../firebase/GroupsManager";
import LoadingSpinner from "../components/LoadingSpinner";

const BudgetView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function AddExpensePage({ navigation, route }) {
  const { groupId } = route.params ? route.params : { groupId: "" };

  const [expenseName, onChangeExpenseName] = useState("");
  const [group, setGroup] = useState(groupId);
  const [amount, onChangeAmount] = useState("");
  const [budget, setBudget] = useState(NaN);

  const [distributions, setDistributions] = useState([]);
  const [distributionError, setDistributionError] = useState(false);

  const [{ user }] = useStateValue();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAddExpenseScreen(user.uid).then((groups) => {
      setGroups(groups);
    });
  }, []);

  useEffect(() => {
    setBudget(groups.find((g) => g.groupId == group)?.remainingBudget || NaN);
  }, [group]);

  const checkDisabled = () => {
    return expenseName === "" || group == 0 || amount == 0 || !isFloat(amount);
  };

  const alertBudget = () =>
    Alert.alert("You are overbudget!", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => handleButtonPress },
    ]);

  const handleButtonPress = () => {
    setLoading(true);
    createExpense(
      user.uid,
      distributions.filter((d) => d.userId !== user.uid || d.amount === 0),
      expenseName,
      group,
      parseFloat(amount)
    ).then(async () => {
      const homeScreenData = await getHomeScreenData(user.uid);
      const groupsPageData = await getGroups(user.uid);
      setLoading(false);
      navigation.navigate("Dashboard", {
        homeScreenData,
        groupsPageData,
      });
    });
  };

  return (
    <Page title={"Add Expense"} navigation={navigation}>
      <PageContent>
        <ScrollView>
          <InputField
            label={"Expense Name"}
            onChange={onChangeExpenseName}
            value={expenseName}
            placeholder={"Enter Expense Name"}
          />
          <MonetaryInputField
            label={"Amount"}
            onChange={onChangeAmount}
            value={amount}
            placeholder={"0.00"}
            error={amount && !isFloat(amount)}
          />
          <StyledPickerForm
            value={group}
            options={groups}
            setValue={(val) => setGroup(val)}
          />
          {group != 0 && !checkDisabled() && (
            <SplitTypeForm
              payees={groups.find((g) => g.groupId == group).members}
              size={groups.find((g) => g.groupId == group).members.length}
              amount={amount}
              setDistributions={(val) => setDistributions(val)}
              setDistributionError={(val) => setDistributionError(val)}
              user={user.uid}
            />
          )}
          {!isNaN(budget) && budget !== 0 && !checkDisabled() && (
            <BudgetView>
              <Heading>Leftover Budget:</Heading>
              <Heading>
                {getMoneyText(roundToTwoDP((budget || 0) - amount))}
              </Heading>
            </BudgetView>
          )}
        </ScrollView>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <AddExpenseButton
            onPress={
              !isNaN(budget) && budget - amount < 0
                ? alertBudget
                : handleButtonPress
            }
            disabled={checkDisabled() || distributionError}
          />
        )}
      </PageContent>
    </Page>
  );
}

export default AddExpensePage;
