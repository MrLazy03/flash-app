import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../../screens/ChatScreen";
import Profile from "../../screens/Profile";
import TabStack from "../TabStack";
import { useTheme } from "styled-components/native";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="TabStack"
      screenOptions={{
        statusBarColor: theme.colors.card,
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <Stack.Screen
        name="TabStack"
        component={TabStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "User",
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerBackVisible: true,
          statusBarHidden: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
