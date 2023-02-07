import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, Auth, graphqlOperation } from "aws-amplify";
import ChatListItem from "../../components/ChatListItem";
import { Entypo } from "@expo/vector-icons";
import { listUserChatRooms } from "../../graphql/customQuries";

const Home = (props) => {
  const { authUser } = useSelector((state) => state.authUser);
  const { navigation } = props;
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo
          name="new-message"
          size={22}
          color="white"
          onPress={openContactList}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const responseChatRooms = await API.graphql(
        graphqlOperation(listUserChatRooms, { id: authUser?.attributes?.sub })
      );
      const rooms = responseChatRooms?.data?.getUser?.ChatRooms?.items || [];
      const sortedRooms = rooms.sort(
        (room1, room2) =>
          new Date(room2.chatRoom.updatedAt) -
          new Date(room1.chatRoom.updatedAt)
      );
      setChatRooms(sortedRooms);
    };

    fetchChatRooms();
  }, [authUser]);

  const openContactList = () => {
    navigation.navigate("Contacts");
  };

  const renderItem = ({ item }) => {
    return <ChatListItem chat={item?.chatRoom} />;
  };
  return <FlatList data={chatRooms} renderItem={renderItem} />;
};

export default Home;

const styles = StyleSheet.create({});
