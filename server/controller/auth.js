import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    const newuser = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.florr(Math.round() * 1000),
    });
    const saveduser = await newuser.save();
    res.status(201).json({
      status: "success",
      message: "New user is successfully created",
      newuser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Loging IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) return res.status(500).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    delete user.password;
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
