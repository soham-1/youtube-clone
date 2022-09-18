import express from 'express';
import {
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
    trend,
    sub,
    search,
    getByTag,
    random,
} from '../controllers/video.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/trend", trend); // place these above /:id otherwise they conflict i.e /trend will match with /:id and :id will be called
router.get("/sub", verifyToken, sub);
router.get("/search", search);
router.get("/getByTag", getByTag);
router.get("/random", random);

router.get("/:id", getVideo);
router.post("/", verifyToken, createVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);


export default router;