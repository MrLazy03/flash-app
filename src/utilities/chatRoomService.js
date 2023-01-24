import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "../graphql/customQuries";

export const getCommonChatRoom = async (userid) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chat rooms of logged user
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser?.attributes?.sub })
  );
  const myChatRooms = response?.data?.getUser?.ChatRooms?.items || [];

  const commonChatRoom = myChatRooms.find((item) =>
    item?.chatRoom?.users?.items?.some(
      (userItem) => userid === userItem?.user?.id
    )
  );

return commonChatRoom?.chatRoom;
};
