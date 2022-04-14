import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PageView, { PageContent } from "../components/page/Page";
import Icon from "react-native-vector-icons/AntDesign";
import ThemeIcon from "react-native-vector-icons/Ionicons";
import { logout, getUserData } from "../firebase/Authentication";
import { useStateValue } from "../StateProvider";

const NameText = styled.Text`
  font-family: SourceSansPro_400Regular;
  font-size: 25px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 10px;
`;

const EmailText = styled.Text`
  font-family: SourceSansPro_400Regular;
  font-size: 15px;
  color: ${(props) => props.theme.primaryText};
`;

const LogoutContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;
const LogoutText = styled.Text`
  font-family: RobotoCondensed_400Regular;
  font-size: 18px;
  color: ${(props) => props.theme.secondaryText};
`;

const StyledIcon = styled(Icon)`
  color: ${(props) => props.theme.secondaryText};
  margin-right: 10px;
`;

const ThemeToggleIcon = styled(ThemeIcon)`
  color: ${(props) => props.theme.primaryText};
  margin: 40px 0px;
`;

function AccountInfoScreen({ navigation, themeToggler }) {
  const [userData, setUserData] = useState("");
  const [{ user }] = useStateValue();

  useEffect(() => {
    getUserData(user.uid).then((userData) => setUserData(userData));
  }, []);

  return (
    <PageView title={"Account Info"} navigation={navigation}>
      <PageContent>
        <NameText>{userData.name}</NameText>
        <EmailText>{userData.email}</EmailText>
        <ThemeToggleIcon name="moon-outline" size={30} onPress={themeToggler} />
        <LogoutContainer onPress={logout}>
          <StyledIcon name={"logout"} size={18} />
          <LogoutText>Logout</LogoutText>
        </LogoutContainer>
      </PageContent>
    </PageView>
  );
}

export default AccountInfoScreen;
