import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import Message from "../../components/Message";
import InputBox from "../../components/InputBox/InputBox";
import backgroundImage from "../../../assets/BG.png";
import messages from "../../DummyData/message.json";
import { Container } from "../../styledComponents/Container";
import { useNavigation } from "@react-navigation/native";
import { getChatRoom, listMessagesByChatRoom } from "../../graphql/queries";
import { onCreateMessage, onUpdateChatRoom } from "../../graphql/subscriptions";

const ChatScreen = (props) => {
  const { navigation, route } = props;
  const { chatRoomId, userName } = route?.params;

  const [chatRoom, setChatRoom] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: userName });
  }, [userName]);

  // fetch chat rooms
  useEffect(() => {
    const fetchChatRoomMessages = async () => {
      const response = await API.graphql(
        graphqlOperation(getChatRoom, { id: chatRoomId })
      ).then((result) => result?.data);
      setChatRoom(response?.getChatRoom);
    };
    fetchChatRoomMessages();

    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chatRoomId } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((exitingCR) => ({
          ...(exitingCR || {}),
          ...value.data.onUpdateChatRoom,
        } ));
      },
      error: (err) => console.log(err),
    });

    return () => subscription.unsubscribe();
  }, [chatRoomId]);

  // fetch messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID: chatRoomId,
        sortDirection: "DESC",
      })
    ).then((result) => {
      setMessages(result?.data?.listMessagesByChatRoom?.items);
    });
    // subscribe to new messages
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatroomID: { eq: chatRoomId } },
      })
    ).subscribe({
      next: ({ value }) => {
        console.log("new", value);
        setMessages((prevMessages) => [
          value.data.onCreateMessage,
          ...prevMessages,
        ]);
      },
      error: (e) => {
        console.log(e);
      },
    });

    return () => subscription.unsubscribe();
  }, [chatRoomId]);

  const renderActions = () => {
    return <InputBox chatRoom={chatRoom} />;
  };

  const renderMessage = ({ item }) => {
    return <Message message={item} />;
  };
  const renderChats = () => {
    return (
      <FlatList
        data={messages}
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
