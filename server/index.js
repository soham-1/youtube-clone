import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.ATLAS_URI).then(() => {
        console.log("connected to db");
    }).catch((err) => {
        throw err;
    });
};


app.listen(8800, () => {
    connect();
    console.log("server started!");
});