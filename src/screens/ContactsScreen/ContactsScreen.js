import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Contact from "../../components/Contact";
import { listUsers } from "../../graphql/queries";
import chats from "../../DummyData/chat";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setContacts(result?.data?.listUsers?.items)
    });
  }, []);

  const renderItem = ({ item }) => {
    return <Contact user={item} />;
  };

  return <FlatList data={contacts} renderItem={renderItem} />;
};

export default ContactsScreen;

const styles = StyleSheet.create({});
