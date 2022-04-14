import React, { useState } from "react";
import { LoginContainer, BackIcon, Content, Form } from "./LoginPage";
import LoginBackground from "../assets/LoginBackground";
import InputField from "../components/input/InputField";
import SignUpButton from "../components/buttons/OrangeButton";
import { handleSignUp } from "../firebase/Authentication";
import styled from "styled-components/native";
import LoadingSpinner from "../components/LoadingSpinner";

const Error = styled.Text`
  color: ${(props) => props.theme.errorText};
  font-size: 18px;
  font-family: "RobotoCondensed_300Light_Italic";
  margin-top: 5px;
`;

function SignUpPage({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPass, onChangeConfirmPass] = useState("");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);

  const checkDisabled = () => {
    return name === "" || email === "" || password === "" || confirmPass === "";
  };

  return (
    <LoginContainer>
      <LoginBackground heading={"Sign Up"} />
      <BackIcon
        name="arrowleft"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Landing")}
      />

      <Content>
        <Form>
          <InputField
            label={"Name"}
            onChange={onChangeName}
            value={name}
            placeholder={"Full Name"}
            isUserForm={true}
          />
          <InputField
            label={"Email"}
            onChange={onChangeEmail}
            value={email}
            placeholder={"user@example.com"}
            isUserForm={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <InputField
            label={"Password"}
            onChange={onChangePassword}
            value={password}
            placeholder={"Password"}
            secure={true}
            isUserForm={true}
          />
          <InputField
            label={"Confirm Password"}
            onChange={onChangeConfirmPass}
            value={confirmPass}
            placeholder={"Confirm Password"}
            secure={true}
            isUserForm={true}
          />
        </Form>

        <Error>{error}</Error>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <SignUpButton
            disabled={checkDisabled()}
            text={"Sign Up"}
            onPress={() =>
              handleSignUp(
                name,
                email,
                password,
                confirmPass,
                setError,
                setLoading
              )
            }
          />
        )}
      </Content>
    </LoginContainer>
  );
}

export default SignUpPage;
