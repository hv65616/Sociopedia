import express from "express";
import {
  getuser,
  getuserfriends,
  addremovefriend,
} from "../controller/users.js";
import {verifytoken} from "../middleware/auth.js";
const router = express();
router.get("/:id", verifytoken, getuser);
router.get("/:id/friends", verifytoken, getuserfriends);
router.patch("/:id/:friendId", verifytoken, addremovefriend);

export default router;
