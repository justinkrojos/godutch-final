import React, { useState } from "react";
import styled from "styled-components/native";

export const Error = styled.Text`
  color: ${(props) => props.theme.errorText};
  font-size: 18px;
  font-family: "RobotoCondensed_300Light_Italic";
  margin-top: 5px;
`;
