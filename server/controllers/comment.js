import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const getComment = async (req, res, next) => {
    try {
        const videoId = req.params.video_id;
        const comments = await Comment.find({videoId: videoId});
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.video_id });
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
    } catch (err) {
      next(err);
    }
}

export const deleteComment = async (req, res, next) => {
    try {

    } catch (err) {
        
    }
}