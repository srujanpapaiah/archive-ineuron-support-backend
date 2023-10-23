import User from "../model/user-model";

const signup = async (username: string, email: string, password: string) => {
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

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (user) {
    const passwordMatched = await user.matchPassword(password);
    if (passwordMatched) {
      return user;
    }
  }

  throw new Error("Email or password is wrong");
};

export default module.exports = {
  signup,
  login,
};
