import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});
        await newUser.save();
        return res.status(200).send("user has been created");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username:req.body.username });
        if (!user) return res.status(404).send("User not found!");

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return res.status(400).send("Wrong Password")

        const token = jwt.sign({id: user._doc._id}, process.env.JWT);
        const {password, ...other} = user._doc;

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