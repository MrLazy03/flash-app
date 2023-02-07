import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Container } from "./styles";
import { Title, SubText, Text } from "../../styledComponents/text";
import avatar from "../../images/avatar.png";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoom } from "../../utilities/chatRoomService";
const Contact = (porps) => {
  const { user } = porps;
  const navigation = useNavigation();
  const { authUser } = useSelector((state) => state.authUser);


  const renderProfileImage = () => {
    return (
      <Image
        source={user?.image ? { uri: user?.image } : avatar}
        // source={avatar}
        style={styles.image}
      />
    );
  };

  const renderStatus = () => {
    return <SubText numberOfLines={1}>{user?.status}</SubText>;
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
        </View>
        {renderStatus()}
      </View>
    );
  };

  const handleSelectedContact = async () => {
    // check if we have already a chatroom with user
    const commonChatRoom = await getCommonChatRoom(user?.id);
    if (commonChatRoom) {
      // navigat to existing chat room
      navigation.navigate("Chat", {
        chatRoomId: commonChatRoom?.id,
        userName: user?.name,
      });
      return;
    }


    // // create a chatroom if there is no chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    const newChatRoom = newChatRoomData?.data?.createChatRoom;

    if (newChatRoom) {
      // Add the clicked user to the chatroom
      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: { chatRoomId: newChatRoom?.id, userId: user?.id },
        })
      );

      // Add the Auth user to the chatroom
      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: {
            chatRoomId: newChatRoom?.id,
            userId: authUser?.attributes?.sub,
          },
        })
      );

      // navigate to the chatroom
      navigation.navigate("Chat", {
        chatRoomId: newChatRoom?.id,
        userName: user?.name,
      });
    } else {
      // handle error while creating chatroom
    }
  };

  return (
    <Container onPress={handleSelectedContact}>
      {renderProfileImage()}
      {renderOtherDetails()}
    </Container>
  );
};

export default Contact;

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
