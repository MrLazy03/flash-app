import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { Title, SubText, Text } from "../../styledComponents/text";
import { Container } from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import avatar from "../../images/avatar.png";
import { onUpdateChatRoom } from "../../graphql/subscriptions";

dayjs.extend(relativeTime);

const ChatListItem = (props) => {
  const { chat } = props;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chatRoom?.users?.items.find(
        (item) => item?.user?.id !== authUser?.attributes?.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.log(err),
    });

    return () => subscription.unsubscribe();
  }, []);

  const lastMessage = chatRoom?.LastMessage;
  // const user = chatRoom?.users?.items?.[1]?.user;

  const renderProfileImage = () => {
    return (
      <Image
        source={user?.image ? { uri: user?.image } : avatar}
        style={styles.image}
      />
    );
  };

  const renderLastMessageTime = () => {
    const time = dayjs(lastMessage?.createdAt).fromNow(true);
    return <SubText>{time}</SubText>;
  };

  const renderLastMessageText = () => {
    return (
      <Text numberOfLines={1} style={{ flex: 1 }}>
        {lastMessage?.text}
      </Text>
    );
  };
  const renderOtherDetails = () => {
    return (
      <View style={styles.otherDetail}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Title numberOfLines={1} style={{ flex: 1 }}>
            {user?.name}
          </Title>
          {lastMessage && renderLastMessageTime()}
        </View>
        {lastMessage && renderLastMessageText()}
      </View>
    );
  };

  const handleSelectedChat = () => {
    chatRoom?.id &&
      navigation.navigate("Chat", {
        chatRoomId: chatRoom?.id,
        userName: user?.name,
      });
  };

  return (
    <Container onPress={handleSelectedChat} style={styles.container}>
      {renderProfileImage()}
      {renderOtherDetails()}
    </Container>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
  },

  otherDetail: {
    flexDirection: "column",
    marginLeft: 25,
    flex: 1,
  },
});
