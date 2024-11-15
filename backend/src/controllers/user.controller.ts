import { Request, response, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import bcrypt from "bcrypt";

// Get all users
const getUsers = (req: Request, res: Response): void => {
  const users = userModel.findAll();
  res.json(users);
};

// Get user by id
const getUserById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  const user = userModel.findById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

// Register
const registerUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({ message: "Missing details" });
    return;
  }

  const checkUser = userModel.findByUsername(username);
  if (checkUser) {
    res.status(409).json({ message: "Username taken" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = userModel.create({ username, password: hashedPassword });

  res.status(201).json(user);
};

// Login
const loginUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "Missing details" });
    return;
  }
  const user = userModel.findByUsername(username);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(403).json({ message: "Passwords do not match" });
    return;
  }

  if (!req.session) {
    res.status(500).json({ message: "Session is not initialized" });
  }

  req.session.isAuthenticated = true;
  req.session.userId = user.id;
  res.json({ message: "Login successful" });
};

// checklogin
const checkLogin = async (req: Request, res: Response) => {
  if (req.session.isAuthenticated) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
};

// // profile
// const userProfile = (req: Request, res: Response) => {
//   const { userId } = req.session;
//   const user = userModel.findById(userId);
//   if (!user) {
//     res.json({ message: "User not fond" });
//     return;
//   }
//   res.json(user);
// };

// logout
const logoutUser = (req: Request, res: Response) => {
  req.session = { isAuthenticated: false, userId: "" };
  res.send({ message: `Lodded out successful` });
};

export default {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  checkLogin,
  // userProfile,
  logoutUser,
};
