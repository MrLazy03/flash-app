import { StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { Container } from "../../styledComponents/Container";
import { Title, Text, ButtonText } from "../../styledComponents/text";
import { RoundedTextInput } from "../../styledComponents/textInput";
import { ButtonContainer } from "../../styledComponents/button";

const Login = (props) => {
  const { navigation } = props;
  const [inputNumber, setInputNumber] = useState("");

  const handleProceed = () => {
    if (inputNumber.length === 10) {
      console.log(inputNumber);
      navigation.navigate("OtpVerify", { mobileNumber:inputNumber });
      setInputNumber("");
    } else {
      console.log("wrong number");
    }
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Title>Enter Mobile Number</Title>
      <RoundedTextInput
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoFocus={true}
        value={inputNumber}
        cursorColor="white"
        maxLength={10}
        textAlign="center"
        onChangeText={(text) => setInputNumber(text)}
      />
      <ButtonContainer onPress={handleProceed}>
        <ButtonText>Proceed</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Login;
