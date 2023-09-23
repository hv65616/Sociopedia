import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authroutes from "./routes/auth.js";
import { register } from "./controller/auth.js";
import userroutes from "./routes/users.js";
import postroutes from "./routes/posts.js";
import { verifytoken } from "./middleware/auth.js";
import { createpost } from "./controller/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage
// This all storage information is coming from multer package and for the source you can visit the github repo of multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifytoken, upload.single("picture", createpost));

// Routes
app.use("/auth", authroutes);
app.use("/users", userroutes);
app.use("/posts", postroutes);

// Mongosse Setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
