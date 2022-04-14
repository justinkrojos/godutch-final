import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { ToastAndroid, TouchableOpacity, Platform } from "react-native";
import Page, { PageContent, Heading } from "../components/page/Page";
import InputField from "../components/input/InputField";
import MonetaryInputField from "../components/input/MonetaryInputField";
import * as GroupActions from "../constants/GroupActions";
import OrangeButton from "../components/buttons/OrangeButton";
import { isFloat } from "../helpers";
import Icon from "react-native-vector-icons/AntDesign";
import Clipboard from "expo-clipboard";
import { updateGroup } from "../firebase/GroupsManager";

const MemberText = styled.Text`
  font-family: "SourceSansPro_400Regular_Italic";
  font-size: 18px;
  color: ${(props) => props.theme.primaryText};
`;

const InviteText = styled.Text`
  font-family: "SourceSansPro_400Regular";
  font-size: 28px;
  color: ${(props) => props.theme.primaryText};
  text-align: center;
`;

const CopyIcon = styled(Icon)`
  margin: 0px 10px;
  color: ${(props) => props.theme.primaryText};
`;

const InviteContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

function GroupDetailsPage({ navigation, route }) {
  const { group } = route.params;
  const [groupName, setGroupName] = useState(group.name);
  const [budget, setBudget] = useState(isNaN(group.budget) ? "" : group.budget);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(groupName === "" || (budget && !isFloat(budget)));
  }, [groupName, budget]);

  const handleButtonPress = () => {
    updateGroup(group.uid, groupName, budget).then(() => navigation.goBack());
  };

  const MembersList = ({ members }) => {
    return members ? (
      members.map((member) => (
        <MemberText key={member.memberId}>{member.name}</MemberText>
      ))
    ) : (
      <MemberText>No members</MemberText>
    );
  };
  return (
    <Page title={`${GroupActions.EDIT} Group`} navigation={navigation}>
      <PageContent>
        <InviteContainer>
          <InviteText>Invite code: {group.uid}</InviteText>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(group.uid);
              Platform.OS === "android" &&
                ToastAndroid.show("Code copied!", ToastAndroid.SHORT);
            }}
          >
            <CopyIcon name="copy1" size={20} />
          </TouchableOpacity>
        </InviteContainer>

        <InputField
          label={"Group Name"}
          onChange={setGroupName}
          value={groupName}
        />
        <MonetaryInputField
          label={"Group Budget (optional)"}
          onChange={setBudget}
          value={budget + ""}
          error={budget && !isFloat(budget)}
          placeholder={"0.00"}
        />
        <Heading>Group Members:</Heading>
        <MembersList members={group.members} />

        <OrangeButton
          text={`${GroupActions.EDIT} Group`}
          onPress={handleButtonPress}
          disabled={disabled}
        />
      </PageContent>
    </Page>
  );
}

export default GroupDetailsPage;
