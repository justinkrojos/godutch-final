import React, { useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { darkMode, lightMode } from "./theme/theme";
import { registerRootComponent } from "expo";
import GroupPage from "./screens/GroupPage";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import LoadingScreen from "./screens/LoadingScreen";
import AccountInfoScreen from "./screens/AccountInfoScreen";
import TabNavigator from "./navigation/TabNavigator";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  RobotoCondensed_300Light_Italic,
  RobotoCondensed_400Regular,
  RobotoCondensed_700Bold,
  PlayfairDisplay_700Bold,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
} from "@expo-google-fonts/dev";
import ManageGroupPage from "./screens/ManageGroupPage";
import AddExpensePage from "./screens/AddExpensePage";
import GroupDetailsPage from "./screens/GroupDetailsPage";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { fixTimeoutWarning } from "./helpers";

fixTimeoutWarning();

function App() {
  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  let [fontsLoaded] = useFonts({
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
    PlayfairDisplay_700Bold,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme === "dark" ? darkMode : lightMode}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              theme === "dark"
                ? darkMode.primaryBackground
                : lightMode.primaryBackground,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Loading"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Landing" component={LandingPage} />
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="SignUp" component={SignUpPage} />
              <Stack.Screen name="Dashboard" component={TabNavigator} />
              <Stack.Screen name="AccountInfo">
                {(props) => (
                  <AccountInfoScreen themeToggler={themeToggler} {...props} />
                )}
              </Stack.Screen>
              <Stack.Screen name="ManageGroup" component={ManageGroupPage} />
              <Stack.Screen name="AddExpense" component={AddExpensePage} />
              <Stack.Screen name="GroupPage" component={GroupPage} />
              <Stack.Screen
                name="GroupDetailsPage"
                component={GroupDetailsPage}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </StateProvider>
  );
}

export default registerRootComponent(App);
