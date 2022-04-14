import React from "react";
import styled, { useTheme } from "styled-components/native";
import { getExpenseStatus } from "../../helpers";
import Card, { NameText, MoneyText, CardContainer } from "./Card";
import Icon from "react-native-vector-icons/AntDesign";

const OweText = styled.Text`
  font-family: "RobotoCondensed_400Regular";
  font-size: 12px;
  color: ${(props) => props.colour};
  margin-bottom: 5px;
`;

const AddCardView = styled(CardContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function GroupCard({ groupName, moneyAmount, navigation, groupId }) {
  const theme = useTheme();
  const status = getExpenseStatus(moneyAmount, theme.primaryText);

  return (
    <Card
      cardHeight={"110px"}
      cardWidth={"48%"}
      onPress={() => navigation.navigate("GroupPage", { groupId })}
    >
      <NameText numberOfLines={1}>{groupName}</NameText>
      <MoneyText colour={status.colour}>${status.total}</MoneyText>
      <OweText colour={status.colour}>{status.message}</OweText>
    </Card>
  );
}

export function AddGroupCard({ navigation }) {
  return (
    <AddCardView
      cardHeight={"110px"}
      cardWidth={"48%"}
      addCard={true}
      onPress={() => navigation.navigate("ManageGroup")}
    >
      <Icon name="plus" size={30} color="white" />
    </AddCardView>
  );
}
export default GroupCard;
