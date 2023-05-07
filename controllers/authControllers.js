import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("user already exists");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("user does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("user does not exist");
  }

  const token = user.createJwt();
  user.password = undefined;
  res
    .status(StatusCodes.CREATED)
    .json({ user, token, location: user.location });
};

//update user

const updateUser = async (req, res) => {
  const { email, name, location, lastName } = req.body;
  if (!email || !name || !location || !lastName) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJwt();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
export { register, login, updateUser };
