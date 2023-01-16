import { View, Text, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/modules/counter/counterSlice";
import { ButtonContainer } from "../styledComponents/button";
import { ButtonText } from "../styledComponents/text";

const changeCounter = () => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    dispatch(decrement());
  };

  const handleIncrese = () => {
    dispatch(increment());
  };
const handleChangeByamount=()=>{
    dispatch(incrementByAmount(20))
}

  return (
    <View>
      <Button title="Increase" onPress={handleIncrese} />
      <Button title="Decrease" onPress={handleDecrease} />
      <ButtonContainer onPress={handleChangeByamount}>
        <ButtonText>Change By Amount</ButtonText>
      </ButtonContainer>
    </View>
  );
};

export default changeCounter;
