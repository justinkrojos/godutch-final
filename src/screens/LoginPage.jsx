import React, { useState } from "react";
import styled from "styled-components/native";
import LoginButton from "../components/buttons/OrangeButton";
import Icon from "react-native-vector-icons/AntDesign";
import { Error } from "../components/input/Error";
import InputField from "../components/input/InputField";
import LoginBackground from "../assets/LoginBackground";
import { handleLogin } from "../firebase/Authentication";
import LoadingSpinner from "../components/LoadingSpinner";

export const LoginContainer = styled.ScrollView`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

export const BackIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  left: 20px;
`;

export const Content = styled.View`
  width: 100%;
  padding: 0px 10%;
`;

export const Form = styled.View`
  width: 100%;
  margin-bottom: 12px;
`;

// const ForgotPasswordText = styled.Text`
//   width: 100%;
//   text-align: right;
//   font-style: italic;
//   text-decoration: underline;
//   color: ${(props) => props.theme.secondaryText};
// `;

function LoginPage({ navigation }) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);

  const checkDisabled = () => {
    return email === "" || password === "";
  };

  return (
    <LoginContainer>
      <LoginBackground heading={"Login"} />
      <BackIcon
        name="arrowleft"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Landing")}
      />

      <Content>
        <Form>
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
        </Form>

        <Error>{error}</Error>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <LoginButton
            disabled={checkDisabled()}
            text={"Login"}
            onPress={() => {
              setLoading(true);
              handleLogin(email, password, setError, setLoading);
            }}
          />
        )}
      </Content>
    </LoginContainer>
  );
}

export default LoginPage;
