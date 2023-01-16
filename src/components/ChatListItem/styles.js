import styled from "styled-components/native";

export const Container = styled.Pressable`
  height: 70px;
  flex-direction: row;
  margin: 3px 6px 3px 6px;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.ChatListItemCard};
`;
