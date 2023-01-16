import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const showCounter = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{count}</Text>
    </View>
  );
};

export default showCounter;
