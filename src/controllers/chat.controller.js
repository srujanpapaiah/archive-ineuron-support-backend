import {
  accessChatService,
  fetchChatsService,
  createRoomService,
  renameRoomService,
  addToRoomService,
  removeFromRoomService,
} from "../services/chat";

export const accesChat = async (req, res) => {
  const { senderId } = req.body;

  const userID = req.user._id?.toString();

  const response = await accessChatService(userID, senderId);
  return res.json({
    response,
  });
};

export const fetchChats = async (req, res) => {
  const userID = req.user._id?.toString();

  const response = await fetchChatsService(userID);

  res.json(response);
};

export const createRoom = async (req, res) => {
  const userID = req.user._id?.toString();

  if (!req.body.users || !req.body.roomName) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  let users = await JSON.parse(req.body.users);
  let roomName = req.body.roomName;

  if (users.length < 2) {
    res.status(400).send("More than 2 users are required to create a room");
  }

  users.push(userID);

  const response = await createRoomService(userID, users, roomName);

  return res.json(response);
};

export const renameRoom = async (req, res) => {
  const userID = req.user._id?.toString();

  const { chatId, chatName } = req.body;

  const response = await renameRoomService(chatId, chatName);

  return res.json(response);
};

export const addToRoom = async (req, res) => {
  const { chatId, userId } = req.body;

  const response = await addToRoomService(chatId, userId);

  return res.json(response);
};

export const removeFromRoom = async (req, res) => {
  const { chatId, userId } = req.body;

  const response = await removeFromRoomService(chatId, userId);

  return res.json(response);
};
