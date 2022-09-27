import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        return res.status(200).send("user has been created");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).send("User not found!");

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return res.status(400).send("Wrong Password")

        const token = jwt.sign({ id: user._doc._id }, process.env.JWT);
        const { password, ...other } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(other);
    } catch (err) {
        next(err);
    }
};

// no password present in req
export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        console.log(err);
    }
};

export const logout = async (req, res, next) => {
    res.cookie('access_token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({"success": "user logged out successfully"});
}