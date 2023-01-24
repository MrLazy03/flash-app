import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import ChatListItem from "../../components/ChatListItem";
import { Entypo } from "@expo/vector-icons";
import { listUserChatRooms } from "../../graphql/customQuries";

const Home = (props) => {
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
      const authUser = await Auth.currentAuthenticatedUser();

      const responseChatRooms = await API.graphql(
        graphqlOperation(listUserChatRooms, { id: authUser?.attributes?.sub })
      );
      setChatRooms(responseChatRooms?.data?.getUser?.ChatRooms?.items);
    };

    fetchChatRooms();
  },[]);

  const openContactList = () => {
    navigation.navigate("Contacts");
  };

  const renderItem = ({ item }) => {
    return <ChatListItem chatRoom={item?.chatRoom} />;
  };
  return <FlatList data={chatRooms} renderItem={renderItem} />;
};

export default Home;

const styles = StyleSheet.create({});
