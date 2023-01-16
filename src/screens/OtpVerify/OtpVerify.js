import React from "react";
import { Container } from "../../styledComponents/Container";
import { Text, Title } from "../../styledComponents/text";

const OtpVerify = (props) => {
  const { navigation, route } = props;

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Title>Please Enter OTP</Title>
      <Text>OTP sent to {route.params?.mobileNumber}</Text>
    </Container>
  );
};

export default OtpVerify;
