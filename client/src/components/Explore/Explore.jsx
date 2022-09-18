import { useState, useEffect } from 'react';

import ExploreCard from './ExploreCard';
import axiosInstance from '../../utils/axiosInstance';

import './Explore.css';

function Explore() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/videos/trend')
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex flex-column">
      {
        videos.map(video => (
          <ExploreCard key={video._id} video={video} />
        ))
      }
    </div>
  )
}

export default Explore