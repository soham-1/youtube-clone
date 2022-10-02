import { format } from 'timeago.js';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '../../utils/axiosInstance';
import thumbnail from '../../assets/images/default-video-thumbnail.jpg';
import './Explore.css';

function ExploreCard({ video }) {
    const [videoUser, setVideoUser] = useState("");

    useEffect(() => {
        axiosInstance
            .get(`users/${video.userId}`)
            .then((res) => {
                setVideoUser(res.data);
            });
    }, []);
    return (
        <>
            <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
                <div className="explorecard d-flex col-lg-9 p-1 mx-5 mb-3">
                    <div className='me-2'>
                        <img src={video.imgUrl !== "" ? video.imgUrl : thumbnail} alt="video" className='video' />
                    </div>
                    <div className='d-flex flex-column text-white'>
                        <div className='fw-bold fs-5'>
                            {video.title}
                        </div>
                        <div className='mb-2'>
                            {videoUser.username}
                        </div>
                        <div>
                            <small>{video.views} views . {format(video.createdAt)}</small>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ExploreCard;