import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Title, SubText, Text } from "../../styledComponents/text";
import { Container } from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChatListItem = (props) => {
  const { chat } = props;
  const navigation = useNavigation();

  const renderProfileImage = () => {
    return <Image source={{ uri: chat?.user?.image }} style={styles.image} />;
  };

  const renderLastMessageTime = () => {
    const time = dayjs(chat?.lastMessage?.createdAt).fromNow(true);
    return <SubText>{time}</SubText>;
  };

  const renderLastMessageText = () => {
    return (
      <Text numberOfLines={1} style={{ flex: 1 }}>
        {chat?.lastMessage?.text}
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
            {chat?.user?.name}
          </Title>
          {renderLastMessageTime()}
        </View>
        {renderLastMessageText()}
      </View>
    );
  };

  const handleSelectedChat = () => {
    chat?.id &&
      navigation.navigate("Chat", { chatId: chat?.id, name: chat?.user?.name });
  };

  return (
    <Container onPress={handleSelectedChat}>
      {renderProfileImage()}
      {renderOtherDetails()}
    </Container>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
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
