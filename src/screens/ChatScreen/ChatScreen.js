import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import Message from "../../components/Message";
import InputBox from "../../components/InputBox/InputBox";
import backgroundImage from "../../../assets/BG.png";
import messages from "../../DummyData/message.json";
import { Container } from "../../styledComponents/Container";
import { useNavigation } from "@react-navigation/native";
import { getChatRoom } from "../../graphql/queries";

const ChatScreen = (props) => {
  const { navigation, route } = props;
  const { chatRoomId, userName } = route?.params;

  const [chatRoom, setChatRoom] = useState();

  useEffect(() => {
    navigation.setOptions({ title: userName });
  }, [userName]);

  useEffect(() => {
    const fetchChatRoomMessages = async () => {
      const response = await API.graphql(
        graphqlOperation(getChatRoom, { id: chatRoomId })
      ).then((result) => result?.data);
      setChatRoom(response?.getChatRoom);
    };
    fetchChatRoomMessages();
  }, []);

  const renderActions = () => {
    return <InputBox chatRoom={chatRoom} />;
  };

  const renderMessage = ({ item }) => {
    return <Message message={item} />;
  };
  const renderChats = () => {
    return (
      <FlatList
        data={chatRoom?.Messages?.items}
        renderItem={renderMessage}
        inverted
        style={styles.list}
      />
    );
  };

  return (
    <Container>
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        {renderChats()}
        {renderActions()}
      </ImageBackground>
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  list: {
    padding: 4,
  },
});
