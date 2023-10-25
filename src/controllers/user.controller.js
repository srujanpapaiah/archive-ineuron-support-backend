import userService from "../services/user";
import generateToken from "../config/generateToken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userService.signup(username, email, password);
  return res.status(201).json({
    status: "ok",
    // _id: user._id,
    // username: user.username,
    // email: user.email,
    // token: await generateToken({
    //   id: user._id,
    //   email: user.email,
    // }),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);
  return res.status(200).json({
    status: "ok",
    token: await generateToken({
      id: user._id,
      email: user.email,
    }),
  });
};

const allUsers = async (req, res) => {
  const users = await userService.allUsers(req);
  return res.status(200).json({
    status: "ok",
    users,
  });
};

export { signup, login, allUsers };
