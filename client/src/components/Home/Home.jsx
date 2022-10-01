import { useState, useEffect } from 'react';

import Card from '../Card/Card';
import axiosInstance from '../../utils/axiosInstance';

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axiosInstance
            .get('/videos/random')
            .then(res => {
                setVideos(res.data);
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

export default Home;