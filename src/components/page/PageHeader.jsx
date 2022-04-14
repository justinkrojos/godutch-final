import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { getGroups } from "../../firebase/GroupsManager";
import { useStateValue } from "../../StateProvider";

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px 20px 20px;
  background: ${(props) => props.theme.headerBackground};
`;

export const HeaderTitle = styled.Text`
  color: white;
  font-size: 30px;
  font-family: "PlayfairDisplay_700Bold";
  margin: 0px 10px;
  text-align: center;
  flex: 1;
`;

function PageHeader({ title, navigation, action, group }) {
  const [{ user }] = useStateValue();
  const onPressLeft = async () => {
    switch (action) {
      case "Account":
        navigation.navigate("AccountInfo");
        break;
      case "GroupsPage":
        var groupsPageData = await getGroups(user.uid);
        navigation.navigate("Dashboard", {
          screen: "GroupsPage",
          groupsPageData: groupsPageData,
        });
        break;
      default:
        navigation.goBack();
        break;
    }
  };

  return (
    <HeaderContainer>
      <TouchableOpacity onPress={onPressLeft}>
        <Icon
          name={action === "Account" ? "user" : "arrowleft"}
          size={25}
          color="white"
        />
      </TouchableOpacity>
      <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
      {group !== undefined ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GroupDetailsPage", { group: group })
          }
        >
          <Icon name="infocirlceo" size={25} color="white" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </HeaderContainer>
  );
}

export default PageHeader;
