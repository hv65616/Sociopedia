import express from "express";
import { getfeedposts, getuserposts, likepost } from "../controller/posts.js";
import { verifytoken } from "../middleware/auth.js";
const router = express.Router();
// Read
router.get("/", verifytoken, getfeedposts);
router.get("/:userId/posts", verifytoken, getuserposts);

// Update
router.patch("/:id/like", verifytoken, likepost);
export default router;
