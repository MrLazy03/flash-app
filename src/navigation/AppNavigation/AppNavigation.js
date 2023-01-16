import React from "react";
import AuthStack from "../AuthStack";
import HomeStack from "../HomeStack";

const AppNavigation = () => {
  const user = true;
  const renderAppStack = () => {
    return user ? <HomeStack /> : <AuthStack />;
  };

  return renderAppStack();
};

export default AppNavigation;
