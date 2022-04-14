import React from "react";
import styled, { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "./PageHeader";

export const StyledView = styled(LinearGradient)`
  height: 100%;
`;

export const PageContent = styled.View`
  padding: 8%;
  position: relative;
  flex: 1 1 auto;
  padding-bottom: 90px;
`;

export const StyledScrollView = styled.ScrollView`
  height: 100%;
`;

export const Heading = styled.Text`
  font-family: "RobotoCondensed_400Regular";
  font-size: 18px;
  color: ${(props) => props.theme.primaryText};
  margin-top: 26px;
  margin-bottom: 18px;
`;

function Page({ children, title, navigation, action, group }) {
  const theme = useTheme();
  return (
    <StyledView colors={[theme.primaryBackground, theme.primaryGradient]}>
      <PageHeader
        title={title}
        navigation={navigation}
        action={action}
        group={group}
      />
      {children}
    </StyledView>
  );
}

export default Page;
