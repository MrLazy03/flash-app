import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React, { useEffect } from "react";
import Message from "../../components/Message";
import InputBox from "../../components/InputBox/InputBox";
import backgroundImage from "../../../assets/BG.png";
import messages from "../../DummyData/message.json";
import { Container } from "../../styledComponents/Container";

const ChatScreen = (props) => {
  const { navigation, route } = props;

  useEffect(() => {
    navigation.setOptions({ title: route?.params?.name });
  }, [route?.params?.name]);

  const renderActions = () => {
    return <InputBox />;
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
