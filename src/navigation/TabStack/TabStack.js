import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import NotImplementedScreen from "../../screens/NotImplementedScreen";
import Home from "../../screens/Home";

const TabStack = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        statusBarColor: theme.colors.card,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          paddingBottom: 5,
          height: 50,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Status"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color={focused ? "white" : "whitesmoke"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "call" : "call-outline"}
              size={24}
              color={focused ? "white" : "whitesmoke"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              size={24}
              color={focused ? "white" : "whitesmoke"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              size={24}
              color={focused ? "white" : "whitesmoke"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? "white" : "whitesmoke"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
