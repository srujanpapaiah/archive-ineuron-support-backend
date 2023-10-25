import Chat from "../model/chat-model";
import User from "../model/user-model";
import mongoose from "mongoose";

// export const accessChatService = async (userID: string, senderId: string) => {
//   const chatId = `${userID}_${senderId}`;

//   const pipeline = [
//     {
//       $match: {
//         isGroupChat: false,
//         _id: chatId, // Use the chat identifier as the _id
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "latestMessage.sender",
//         foreignField: "_id",
//         as: "senderInfo",
//       },
//     },
//     {
//       $unwind: "$senderInfo",
//     },
//     {
//       $project: {
//         _id: 1,
//         users: 1,
//         latestMessage: {
//           sender: {
//             _id: "$senderInfo._id",
//             name: "$senderInfo.name",
//             pic: "$senderInfo.pic",
//             email: "$senderInfo.email",
//           },
//         },
//       },
//     },
//   ];

//   const isChat = await User.aggregate(pipeline);

//   if (isChat.length > 0) {
//     return isChat[0];
//   } else {
//     const chatData = {
//       chatName: "sender",
//       isGroupChat: false,
//       users: [userID, senderId],
//     };

//     try {
//       const createdChat = await Chat.create(chatData);
//       const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users",
//         "-password"
//       );
//       return fullChat;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }
// };

export const accessChatService = async (userID, senderId) => {
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userID } } },
      { users: { $elemMatch: { $eq: senderId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    return isChat[0];
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userID, senderId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return FullChat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const fetchChatsService = async (userID) => {
  try {
    let response = await Chat.find({
      users: { $elemMatch: { $eq: userID } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
        });

        return results;
      });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createRoomService = async (userID, users, roomName) => {
  try {
    const groupChat = await Chat.create({
      chatName: roomName,
      users: users,
      isGroupChat: true,
      groupAdmin: userID,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return fullGroupChat;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const renameRoomService = async (chatId, chatName) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    throw new Error("Chat Not Found");
  } else {
    return updatedChat;
  }
};

export const addToRoomService = async (chatId, userId) => {
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    throw new Error("Chat Not Found");
  } else {
    return added;
  }
};

export const removeFromRoomService = async (chatId, userId) => {
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    throw new Error("Chat Not Found");
  } else {
    return removed;
  }
};
