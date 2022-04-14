import React from "react";
import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
  background: ${(props) =>
    props.addCard ? props.theme.addCardBackground : props.theme.cardBackground};
  border-radius: 4px;
  position: relative;
  margin-bottom: 10px;
  height: ${(props) => (props.cardHeight ? props.cardHeight : "auto")};
  width: ${(props) => (props.cardWidth ? props.cardWidth : "auto")};

  shadow-color: black;
  elevation: ${(props) => props.theme.cardShadow};
`;

const Padding = styled.View`
  padding: 10px;
`;

export const NameText = styled.Text`
  font-family: "SourceSansPro_400Regular";
  font-size: 18px;
  margin-bottom: 14px;
  color: ${(props) => props.theme.primaryText};
`;

export const MoneyText = styled.Text`
  font-family: "RobotoCondensed_700Bold";
  font-size: 19px;
  color: ${(props) => props.colour};
`;

export const GreenBar = styled.View`
  width: 100%;
  height: 7px;
  background: ${(props) => props.theme.accent};
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 4px;
`;

function Card({ children, cardHeight, cardWidth, onPress }) {
  return (
    <CardContainer
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      onPress={onPress}
    >
      <Padding>{children}</Padding>
      <GreenBar />
    </CardContainer>
  );
}

export default Card;
