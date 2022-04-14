import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "styled-components/native";
import GroupsPage from "../screens/GroupsPage";
import HomePage from "../screens/HomePage";
import Page from "../components/page/Page";

const Tab = createMaterialTopTabNavigator();

const BottomTabNavigator = ({ route, navigation }) => {
  const theme = useTheme();
  const { homeScreenData, groupsPageData } = route.params;

  return (
    <Page title={"Go Dutch"} navigation={navigation} action={"Account"}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        tabBarOptions={{
          style: {
            backgroundColor: theme.tab.inactiveTab,
            height: 36,
          },
          tabStyle: {
            height: 36,
            padding: 0,
            minHeight: 36,
          },
          indicatorStyle: {
            borderBottomWidth: 36,
            borderColor: theme.tab.activeTab,
          },
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <HomePage
              users={homeScreenData.users}
              totalAmount={homeScreenData.totalAmount}
              {...props}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Groups">
          {(props) => (
            <GroupsPage
              groups={groupsPageData.groups}
              totalAmount={groupsPageData.totalAmount}
              {...props}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Page>
  );
};

export default BottomTabNavigator;
