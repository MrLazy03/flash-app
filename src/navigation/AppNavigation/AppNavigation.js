import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "../AuthStack";
import HomeStack from "../HomeStack";
import { fetchAuthUser } from "../../store/modules/authUser/authUserSlice";

const AppNavigation = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  const renderAppStack = () => {
    return authUser ? <HomeStack /> : <AuthStack />;
  };

  return renderAppStack();
};

export default AppNavigation;
