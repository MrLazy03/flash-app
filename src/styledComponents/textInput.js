import styled from "styled-components/native";

export const RoundedTextInput = styled.TextInput`
  color: ${(props) => props.color || props.theme.colors.primaryText};
  background-color: ${(props) =>
    props.background || props.theme.colors.inputBackground};
  height: ${(props) => props.height || "50px"};
  width: ${(props) => props.width || "250px"};
  border-radius: 20px;
  padding: ${(props) => props.padding || "10px"};;
  font-size: ${(props) => props.fontSize || "20px"};;
`;
