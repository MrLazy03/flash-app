import { API, graphqlOperation, Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { listChatRooms } from "../graphql/customQuries";

export const getCommonChatRoom = async (userid) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chat rooms of logged user
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser?.attributes?.sub })
  );
  const myChatRooms = response?.data?.getUser?.ChatRooms?.items || [];

  const commonChatRoom = myChatRooms.find((chatRoomItem) => {
    return (
      chatRoomItem.chatRoom.users.items.length === 2 &&
      chatRoomItem.chatRoom.users.items.some(
        (userItem) => userItem.user.id === userid
      )
    );
  });
  console.log(commonChatRoom, "nirbhay");

  return commonChatRoom?.chatRoom;
};
