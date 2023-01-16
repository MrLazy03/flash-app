import { FlatList, ScrollView, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import chats from "../../DummyData/chat";

const Home = (props) => {
  const { navigation } = props;
  console.log(props);

  const renderItem = ({ item }) => {
    return <ChatListItem chat={item} />;
  };
  return <FlatList data={chats} renderItem={renderItem} />;
};

export default Home;

const styles = StyleSheet.create({});
