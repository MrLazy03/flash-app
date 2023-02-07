import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Message = (props) => {
  const { message } = props;
  const [isMe, setIsMe] = useState(false);
  const { authUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    const isMyMessage = async () => {
      setIsMe(message?.userID === authUser?.attributes?.sub);
    };
    isMyMessage();
  }, []);

  const renderText = (text) => {
    return <Text style={styles.text}>{text}</Text>;
  };

  const renderCreatedTime = (time) => {
    return <Text style={styles.time}>{dayjs(time).fromNow(true)}</Text>;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      {renderText(message?.text)}
      {renderCreatedTime(message?.createdAt)}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    maxWidth: "75%",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
    fontSize: 13,
  },
  text: {
    fontSize: 14,
  },
});
