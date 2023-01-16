import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login/Login";
import OtpVerify from "../../screens/OtpVerify";
import { useTheme } from "styled-components/native";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        animation: "slide_from_right",
        statusBarColor: theme.colors.statusbar,
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpVerify"
        component={OtpVerify}
        initialParams={{ number: "9570762880" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
