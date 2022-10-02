import express from 'express';

import {
  getUser,
  updateUser,
  deleteUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getSubscribed
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// get list of users for which the current user is subscribed
router.get('/get-subscribed', verifyToken, getSubscribed);

// subscribe a user
router.put("/subscribe/:id", verifyToken, subscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

//unsubscribe a user
router.put("/unsubscribe/:id", verifyToken, unsubscribe);

//get a user
router.get("/:id", getUser);

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

export default router;