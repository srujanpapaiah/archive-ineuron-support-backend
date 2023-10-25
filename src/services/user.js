import User from "../model/user-model";
import { Request } from "express";

const signup = async (username, email, password) => {
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    throw new Error("User Already Exists");
  }

  const savedUser = await User.create({
    username,
    email,
    password,
  });

  if (!savedUser) {
    throw new Error("Failed to create user");
  }

  return savedUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    const passwordMatched = await user.matchPassword(password);
    if (passwordMatched) {
      return user;
    }
  }

  throw new Error("Email or password is wrong");
};

export const allUsers = async (req) => {
  const user = req.body.user._id.toString();

  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: user } });

  return users;
};

export default module.exports = {
  signup,
  login,
  allUsers,
};
