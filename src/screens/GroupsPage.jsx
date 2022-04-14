import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import OweInfoBox from "../components/card/OweInfoBox";
import GroupCard, { AddGroupCard } from "../components/card/GroupCard";
import {
  Heading,
  StyledScrollView,
  PageContent,
} from "../components/page/Page";
import { roundToTwoDP } from "../helpers";

const GroupsList = ({ navigation, groups }) => {
  return groups
    .sort((a, b) =>
      a.groupName.toUpperCase().localeCompare(b.groupName.toUpperCase())
    )
    .map((group) => (
      <GroupCard
        groupName={group.groupName}
        moneyAmount={group.netAmount}
        key={group.groupId}
        groupId={group.groupId}
        navigation={navigation}
      />
    ));
};

const GroupCardList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

function GroupsPage({ navigation, groups, totalAmount }) {
  return (
    <PageContent>
      <OweInfoBox moneyAmount={roundToTwoDP(totalAmount)} />
      <Heading>Your Groups</Heading>
      <StyledScrollView>
        <GroupCardList>
          {groups.length !== 0 && (
            <GroupsList navigation={navigation} groups={groups} />
          )}
          <AddGroupCard navigation={navigation} />
        </GroupCardList>
      </StyledScrollView>
    </PageContent>
  );
}

export default GroupsPage;
