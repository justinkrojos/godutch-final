import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import OweList from "../components/card/OweList";
import { Heading, PageContent } from "../components/page/Page";
import AddExpenseButton from "../components/buttons/AddExpenseButton";
import OweInfoBox from "../components/card/OweInfoBox";
import { roundToTwoDP } from "../helpers";
import * as ExpenseMessages from "../constants/ExpenseMessages";

function HomePage({ navigation, totalAmount, users }) {
  const [total, setTotal] = useState(roundToTwoDP(totalAmount));
  const [usersOwing, setUsersOwing] = useState([]);
  const [usersOwed, setUsersOwed] = useState([]);

  const renderPage = () => {
    navigation.navigate("Loading");
  };
  useEffect(() => {
    setUsersOwed(users.filter((user) => user.netAmount > 0));
    setUsersOwing(users.filter((user) => user.netAmount < 0));
    setTotal(roundToTwoDP(totalAmount));
  }, [users, totalAmount]);

  return (
    <PageContent>
      <OweInfoBox moneyAmount={total} />

      <ScrollView>
        {usersOwing.length !== 0 && (
          <>
            <Heading>{ExpenseMessages.OWING}</Heading>
            <OweList
              oweArray={usersOwing}
              navigation={navigation}
              renderPage={renderPage}
            />
          </>
        )}
        {usersOwed.length !== 0 && (
          <>
            <Heading>{ExpenseMessages.OWED}</Heading>
            <OweList oweArray={usersOwed} navigation={navigation} />
          </>
        )}
      </ScrollView>

      <AddExpenseButton
        text={ExpenseMessages.ADD_EXPENSE}
        onPress={() => navigation.navigate("AddExpense")}
      />
    </PageContent>
  );
}

export default HomePage;
