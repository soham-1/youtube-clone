import { format } from 'timeago.js';
import React from 'react'
import { useEffect, useState, useRef } from 'react';

import { useParams } from 'react-router';

import axiosInstance from '../../utils/axiosInstance';
import './Video.css';
import { useSelector } from 'react-redux';

const Video = () => {
    const [video, setVideo] = useState(undefined);
    const [videoUser, setVideoUser] = useState("");
    const [reload, setReload] = useState(false);
    const [subscriberList, setSubscriberList] = useState([]);
    const [LikeClass, setLikeClass] = useState("me-3 bi bi-hand-thumbs-up");
    const [dislikeClass, setDislikeClass] = useState("me-3 bi bi-hand-thumbs-down");
    const userid = useSelector(state => state.user.userInfo.userid);
    const { id } = useParams();

    const like = () => {
        axiosInstance
            .put(`users/like/${id}`)
            .then((res) => {
                console.log("video liked");
                setReload(!reload);
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
                setReload(!reload);
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
                setReload(!reload);
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    const unsubscribe = () => {
        axiosInstance
            .put(`users/unsubscribe/${videoUser._id}`)
            .then((res) => {
                alert('Unsubscribed successfully');
                setReload(!reload);
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    const getVideo = async () => {
        await axiosInstance
            .get(`videos/${id}`)
            .then((res) => {
                console.log(res)
                axiosInstance
                    .put('videos/add-view', { 'id': id })
                    .then(() => {
                        res.data.views += 1;
                        setVideo(res.data);
                    })

                axiosInstance
                    .get(`users/${res.data.userId}`)
                    .then((res) => {
                        setVideoUser(res.data);
                    });
            });
    }

    useEffect(() => {
        getVideo();
        axiosInstance
            .get('users/get-subscribed')
            .then((res) => {
                setSubscriberList(res.data);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`videos/${id}`)
            .then((res) => {
                console.log(res);
                setVideo(res.data);
            })
            .then(() => {
                axiosInstance
                    .get('users/get-subscribed')
                    .then((res) => {
                        setSubscriberList(res.data);
                    });
            });
    }, [reload]);

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
                <div className='d-flex '>
                    <span className="card-title fw-bold fs-3">{video.title}</span>
                    <div className="d-flex ms-auto">
                        <div className="d-flex flex-column align-items-center">
                            <i className={`${LikeClass}`}
                                onClick={like} onMouseEnter={() => setLikeClass('me-3 bi bi-hand-thumbs-up-fill')}
                                onMouseOut={() => setLikeClass('me-3 bi bi-hand-thumbs-up')}
                            ></i>
                            <span className="me-3">{video.likes.length}</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <i className={`${dislikeClass}`} onClick={dislike} onMouseEnter={() => setDislikeClass('me-3 bi bi-hand-thumbs-down-fill')}
                                onMouseOut={() => setDislikeClass('me-3 bi bi-hand-thumbs-down')}
                            ></i>
                            <span className="me-3">{video.dislikes.length}</span>
                        </div>
                    </div>
                </div>
                <div className="card-text mb-3">description: {video.desc}</div>
                <div className='d-flex align-items-center mb-3'>
                    <div className="card-text fw-bold fs-4 me-5">{videoUser.username}</div>
                    {
                        subscriberList.includes(video.userId) ?
                            <button type="button" className="btn btn-danger col-lg-2" onClick={unsubscribe}>Unsubscribe</button>
                            :
                            <button type="button" className="btn btn-danger col-lg-2" onClick={subscribe}>Subscribe</button>
                    }

                </div>
                <small>{video.views} views . {format(video.createdAt)}</small>
            </div>
        </div>
    );
}

export default Video;