import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "45px"};
  padding: ${(props) => props.padding || "12px"};
  border-radius: ${(props) => props.borderRadius || "10px"};
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.buttonBackground};
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin || "20px"};
`;


