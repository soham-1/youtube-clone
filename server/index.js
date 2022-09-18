import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import AuthRoutes from './routes/auth.js';
import UserRoutes from './routes/users.js';
import VideoRoutes from './routes/videos.js';
import CommentRoutes from './routes/comments.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.ATLAS_URI).then(() => {
        console.log("connected to db");
    }).catch((err) => {
        throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/videos", VideoRoutes);
app.use("/api/comments", CommentRoutes);

app.listen(8800, () => {
    connect();
    console.log("server started!");
});