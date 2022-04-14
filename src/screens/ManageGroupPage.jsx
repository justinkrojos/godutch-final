import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Page, { PageContent } from "../components/page/Page";
import InputField from "../components/input/InputField";
import MonetaryInputField from "../components/input/MonetaryInputField";
import * as GroupActions from "../constants/GroupActions";
import OrangeButton from "../components/buttons/OrangeButton";
import Toggle from "../components/buttons/Toggle";
import { createGroup, joinGroup } from "../firebase/GroupsManager";
import { useStateValue } from "../StateProvider";
import { isFloat } from "../helpers";
import { Error } from "../components/input/Error";
import { getGroups } from "../firebase/GroupsManager";
import LoadingSpinner from "../components/LoadingSpinner";

function ManageGroupPage({ navigation }) {
  const [action, setAction] = useState(GroupActions.JOIN);
  const [groupName, setGroupName] = useState("");
  const [budget, setBudget] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [{ user }] = useStateValue();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkDisabled = () => {
    return (
      (action === GroupActions.CREATE && groupName === "") ||
      (action === GroupActions.JOIN && joinCode === "")
    );
  };

  useEffect(() => {
    setDisabled(checkDisabled);
  }, [groupName, joinCode, action, checkDisabled]);

  const handleButtonPress = () => {
    setLoading(true);
    switch (action) {
      case GroupActions.JOIN:
        joinGroup(user.uid, joinCode, setError, setLoading).then(
          async (result) => {
            if (result) {
              var groupsPageData = await getGroups(user.uid);
              navigation.navigate("Dashboard", {
                screen: "GroupsPage",
                groupsPageData: groupsPageData,
              });
            }
          }
        );

        break;
      case GroupActions.CREATE:
        createGroup(user.uid, groupName, budget).then((groupId) =>
          navigation.navigate("GroupPage", { groupId: groupId })
        );
        break;
    }
  };

  return (
    <Page title={`${action} Group`} navigation={navigation}>
      <PageContent>
        <Toggle action={action} setAction={setAction} />
        {action === GroupActions.CREATE && (
          <View>
            <InputField
              label={"Group Name"}
              onChange={setGroupName}
              value={groupName}
            />
            <MonetaryInputField
              label={"Group Budget (optional)"}
              onChange={setBudget}
              placeholder={"0.00"}
              value={budget}
              error={budget && !isFloat(budget)}
            />
          </View>
        )}
        {action === GroupActions.JOIN && (
          <InputField
            label={"Join Group"}
            onChange={setJoinCode}
            value={joinCode}
          />
        )}

        <Error>{error}</Error>
        {loading ? (
          <LoadingSpinner size="large" color="black" />
        ) : (
          <OrangeButton
            text={`${action} Group`}
            onPress={handleButtonPress}
            disabled={disabled}
          />
        )}
      </PageContent>
    </Page>
  );
}

export default ManageGroupPage;
