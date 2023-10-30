import userService from "../services/user";
import generateToken from "../config/generateToken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userService.signup(username, email, password);
  return res.status(201).json({
    status: "ok",
    message: "User Created Successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const token = await generateToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  // Send the token in the response headers
  res.header("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    status: "ok",
    id: user._id,
    email: user.email,
    username: user.username,
    token,
  });
};

const allUsers = async (req, res) => {
  const users = await userService.allUsers(req);
  return res.status(200).json({
    status: "ok",
    users,
  });
};

const me = async (req, res) => {
  const user = await userService.me(req);
  return res.status(200).json({
    status: "ok",
    user,
  });
};

export { signup, login, allUsers, me };
