import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView).attrs({
  forceInset: { bottom: "never" },
})`
  background-color: ${(props) =>
    props.background || props.theme.colors.background};
  flex: 1;
`;

