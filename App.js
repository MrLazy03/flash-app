import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { Provider } from "react-redux";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import AppNavigation from "./src/navigation/AppNavigation";
import theme from "./src/themes";
import { store } from "./src/store";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser?.attributes?.sub })
      );
      // user signup case-> if user does not exists in database then add it to databse
      if (!userData?.data?.getUser) {
        const newUser = {
          id: authUser?.attributes?.sub,
          name: authUser?.attributes?.name,
          status: "Hey, I am using Flash..",
        };
        try {
          const newUserResponse = await API.graphql(
            graphqlOperation(createUser, { input: newUser })
          );
        } catch {}
      }
    };
    syncUser();
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppNavigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default withAuthenticator(App);
