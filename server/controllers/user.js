import User from '../models/User.js';
import Video from '../models/Video.js';
import removePasswordFromUser from '../utils/remoePasswordFromUser.js';

// verify the user and video id before subscribing and liking

// get user by id, remove password while returning the user
export const getUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user !== null)
            user = removePasswordFromUser(user._doc);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// update everything in user except password
export const updateUser = async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            const id = req.user.id;
            const resUser = await removePasswordFromUser(req.body);
            const updatedUser = await User.findByIdAndUpdate(id, resUser, { new: true });
            return res.status(200).json(removePasswordFromUser(updatedUser._doc));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        next(err);
    }
};

// delete a user
export const deleteUser = async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).send("User deleted");
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        next(err);
    }
};

// subsribe to a user, only increment the subscriber count and push id in subscribed user list
// api/users/:id or user to be subscribed   get subscriber user id from req user set by cookie
export const subscribe = async (req, res, next) => {
    if (req.user.id === req.params.id)
        res.status(403).send("cannot subscribe to self");
    try {
        const sub_user = await User.findById(req.user.id);
        if (sub_user.subscribedUsers.includes(req.params.id))
            return res.status('403').send('user already subscribed');
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).send("Subscribed successfully");
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.");
    } catch (err) {
        next(err);
    }
};
export const like = async (req, res, next) => {
    try {
        const id = req.user.id;
        const video_id = req.params.videoId;
        const video = await Video.findByIdAndUpdate(video_id, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        }, { new: true });
        res.status(200).json(video);
    } catch (err) {

    }
};

export const dislike = async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;
        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        }, { new: true });
        res.status(200).json(video)
    } catch (err) {
        next(err);
    }
};