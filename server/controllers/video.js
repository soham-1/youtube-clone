import User from '../models/User.js';
import Video from '../models/Video.js';

// like dislike create update delete get random getByTag trend search

// get video from id
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

// create video from id
export const createVideo = async (req, res, next) => {
    try {
        const video = Video({ userId: req.user.id, ...req.body });
        const saveVideo = await video.save();
        res.status(201).json(saveVideo);
    } catch (err) {
        next(err);
    }
};

// update video from id
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            res.status(403).send("you can update only your video");
        }
    } catch (err) {
        next(err);
    }
};

// delete video from id
export const deleteVideo = async (req, res, next) => {
    try {
        const video = Video.findById(req.params.id);
        if (!video) res.status(403).send("Video not found");
        if (req.user.id === video.userID) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).send("Video has been deleted");
        } else {
            res.status(403).send("you can update only your video");
        }
    } catch (err) {
        next(err);
    }
};

// get random videos
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 10 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// find most viewed videos
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// get videos by tags specified in url query
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// get all videos from all subscribed channels
export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};