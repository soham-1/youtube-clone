import { format } from 'timeago.js';

import thumbnail from '../../assets/images/default-video-thumbnail.jpg';
import './Explore.css';

function ExploreCard({ key, video }) {
    return (
        <div className="explorecard d-flex col-lg-9 p-1 mx-5 mb-3">
            <div className='me-2'>
                <img src={thumbnail} alt="video" className='video' />
            </div>
            <div className='d-flex flex-column text-white'>
                <div className='fw-bold fs-5'>
                    {video.title}
                </div>
                <div className='mb-2'>
                    {video.desc}
                </div>
                <div>
                    <small>{video.views} views . {format(video.createdAt)}</small>
                </div>
            </div>
        </div>
    )
}

export default ExploreCard;