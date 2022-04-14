import React, { useEffect } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/Logo";
import { useStateValue } from "../StateProvider";
import Firebase from "../../config/Firebase";
import { getHomeScreenData } from "../firebase/ExpenseManager";
import { getGroups } from "../firebase/GroupsManager";

const StyledView = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingScreen({ navigation }) {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          dispatch({
            type: "SET_USER",
            user,
          });

          const homeScreenData = await getHomeScreenData(user.uid);
          const groupsPageData = await getGroups(user.uid);

          navigation.navigate("Dashboard", {
            homeScreenData: homeScreenData,
            groupsPageData: groupsPageData,
          });
        } else {
          navigation.navigate("Landing");
        }
      });
      return unsubscribe;
    });
  }, [navigation]);

  return (
    <StyledView colors={["#051821", "#0D394E"]}>
      <Logo width={"100px"} height={"100px"} />
    </StyledView>
  );
}

export default LoadingScreen;
