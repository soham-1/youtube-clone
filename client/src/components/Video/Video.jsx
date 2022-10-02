import { format } from 'timeago.js';
import React from 'react'
import { useEffect, useState, useRef } from 'react';

import { useParams } from 'react-router';

import axiosInstance from '../../utils/axiosInstance';
import './Video.css';

const Video = () => {
    const [video, setVideo] = useState(undefined);
    const [videoUser, setVideoUser] = useState("");
    const [LikeClass, setLikeClass] = useState("me-3 bi bi-hand-thumbs-up");
    const [dislikeClass, setDislikeClass] = useState("me-3 bi bi-hand-thumbs-down");
    const { id } = useParams();

    const like = () => {
        axiosInstance
            .put(`users/like/${id}`)
            .then((res) => {
                console.log("video liked");
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    const dislike = () => {
        axiosInstance
            .put(`users/dislike/${id}`)
            .then((res) => {
                console.log("video disliked");
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    const subscribe = () => {
        axiosInstance
            .put(`users/subscribe/${videoUser._id}`)
            .then((res) => {
                alert('subscribed successfully');
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const getVideo = async () => {
        await axiosInstance
            .get(`videos/${id}`)
            .then((res) => {
                console.log(res)
                setVideo(res.data);
                axiosInstance
                    .get(`users/${res.data.userId}`)
                    .then((res) => {
                        setVideoUser(res.data);
                    });
            });

        await axiosInstance
            .put('videos/add-view', { 'id': id });
    }

    useEffect(() => {
        getVideo();
    }, []);

    if (video === undefined)
        return (
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="text-white" style={{ width: "fit-content" }}>
            <div>
                <video width="750" height="450" controls >
                    <source src={`${video.videoUrl}`} type="video/mp4" />
                </video>
            </div>
            <div className="d-flex flex-column">
                <div className='d-flex'>
                    <span className="card-title fw-bold fs-3">{video.title}</span>
                    <div className="ms-auto">
                        <i className={`${LikeClass}`}
                            onClick={like} onMouseEnter={() => setLikeClass('me-3 bi bi-hand-thumbs-up-fill')}
                            onMouseOut={() => setLikeClass('me-3 bi bi-hand-thumbs-up')}
                        ></i>
                        <i className={`${dislikeClass}`} onClick={dislike} onMouseEnter={() => setDislikeClass('me-3 bi bi-hand-thumbs-down-fill')}
                            onMouseOut={() => setDislikeClass('me-3 bi bi-hand-thumbs-down')}
                        ></i>
                    </div>
                </div>
                <div className="card-text mb-3">description: {video.desc}</div>
                <div className='d-flex align-items-center mb-3'>
                    <div className="card-text fw-bold fs-4 me-5">{videoUser.username}</div>
                    <button type="button" class="btn btn-danger col-lg-2" onClick={subscribe}>subscribe</button>
                </div>
                <small>{video.views} views . {format(video.createdAt)}</small>
            </div>
        </div>
    );
}

export default Video;