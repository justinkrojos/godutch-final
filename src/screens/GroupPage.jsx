import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import OweInfoBox from "../components/card/OweInfoBox";
import Page, { Heading, PageContent } from "../components/page/Page";
import * as ExpenseMessages from "../constants/ExpenseMessages";
import AddExpenseButton from "../components/buttons/AddExpenseButton";
import OweList from "../components/card/OweList";
import { roundToTwoDP } from "../helpers";
import { getSingleGroup } from "../firebase/GroupsManager";
import { useStateValue } from "../StateProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const BudgetView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function GroupPage({ route, navigation }) {
  const { groupId } = route.params;
  const [group, setGroup] = useState({});
  const [owing, setOwing] = useState([]);
  const [owed, setOwed] = useState([]);
  const [{ user }] = useStateValue();

  const renderPage = () => {
    getSingleGroup(user.uid, groupId).then((group) => {
      setGroup(group);
      setOwing(
        group.interactions.filter((interaction) => interaction.netAmount < 0)
      );
      setOwed(
        group.interactions.filter((interaction) => interaction.netAmount > 0)
      );
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      renderPage();
      return unsubscribe;
    });
  }, [navigation]);

  useEffect(() => {
    console.log(group);
  }, [group]);

  return (
    <Page
      title={Object.keys(group).length !== 0 && group.name}
      navigation={navigation}
      group={Object.keys(group).length !== 0 && group}
      action={"GroupsPage"}
    >
      {Object.keys(group).length === 0 ? (
        <LoadingSpinner />
      ) : (
        <PageContent>
          <BudgetView>
            <Heading>Group Budget:</Heading>
            <Heading>
              {group.budget ? `$${roundToTwoDP(group.budget)}` : "-"}
            </Heading>
          </BudgetView>
          <OweInfoBox moneyAmount={group.netAmount} />
          <ScrollView>
            {owing.length !== 0 && (
              <>
                <Heading>{ExpenseMessages.OWING}</Heading>
                <OweList
                  oweArray={owing}
                  handleRepay={groupId}
                  renderPage={renderPage}
                />
              </>
            )}
            {owed.length !== 0 && (
              <>
                <Heading>{ExpenseMessages.OWED}</Heading>
                <OweList oweArray={owed} />
              </>
            )}
          </ScrollView>
          <AddExpenseButton
            onPress={() => navigation.navigate("AddExpense", { groupId })}
          />
        </PageContent>
      )}
    </Page>
  );
}

export default GroupPage;
