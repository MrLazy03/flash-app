import { View, Image } from "react-native";
import React from "react";
import { Text, Title as TitleText } from "../../styledComponents/text";
const Card = (props) => {
  const { Title, Poster, Runtime, Year } = props.item;
  return (
    <View style={{margin:20, alignItems:'center', justifyContent:'center'}}>
      {Poster && <Image source={{ uri: Poster }} style={{borderRadius:20, width: 300, height: 200 }}  resizeMode='cover'/>}
        <TitleText >{Title}</TitleText>
        <Text>RunTime : {Runtime}</Text>
        <Text>Year : {Year}</Text>
    </View>
  );
};

export default Card;
