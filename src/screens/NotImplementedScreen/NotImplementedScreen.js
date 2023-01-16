import { StyleSheet, Image, View } from "react-native";
import React from "react";
import wipImage from "../../../assets/wip.png";

const NotImplementedScreen = () => {
  return (
    <View>
      <Image source={wipImage} style={{ width: 400, height: 400 }} />
    </View>
  );
};

export default NotImplementedScreen;

const styles = StyleSheet.create({});
