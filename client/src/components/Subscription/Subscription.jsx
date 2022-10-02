import { useState, useEffect } from 'react';

import Card from '../Card/Card';
import axiosInstance from '../../utils/axiosInstance';

function Subscription() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        let videoArr = [];
        axiosInstance
            .get('/users/get-subscribed')
            .then(res => {
                const arr = res.data;
                console.log(arr);
                arr.map((channel) => {
                    axiosInstance
                        .get(`/videos/get-from-user/${channel}/1`)
                        .then(res => {
                            videoArr = [].concat.apply(videoArr, res.data);
                        })
                        .then(() => {
                            console.log(videoArr);
                            setVideos(videoArr);
                        })
                })
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='d-flex flex-wrap w-100'>
            {
                videos.map(video => (
                    <Card key={video._id} video={video} />
                ))
            }
        </div>
    )
}

export default Subscription;