import styled from "styled-components/native";

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 20px;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 16px;
`;

export const SubText = styled.Text`
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 14px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 15px;
`;