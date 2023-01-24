import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const InputBox = (props) => {
  const { chatRoom } = props;
  const [newMessage, setNewMessage] = useState("");

  const showActions = () => {};

  const handleSendMessage = async () => {
    if (!newMessage) return null;
    const authUser = await Auth.currentAuthenticatedUser();

    const message = {
      chatroomID: chatRoom?.id,
      text: newMessage,
      userID: authUser?.attributes?.sub,
    };

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: message })
    );

    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatRoom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatRoom.id,
        },
      })
    );

    setNewMessage("");
  };

  return (
    <View style={styles.actions}>
      <AntDesign name="plus" onPress={showActions} size={24} color="#051526" />
      <TextInput
        onChangeText={(text) => setNewMessage(text)}
        value={newMessage}
        placeholder="type your message..."
        style={styles.input}
      />
      <MaterialIcons
        name="send"
        onPress={handleSendMessage}
        size={24}
        color="#051526"
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 15,
    padding: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    fontSize: 17,
    overflow: "visible",
  },
});
