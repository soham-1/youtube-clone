import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import './Card.css';
import thumbnail from '../../assets/images/default-video-thumbnail.jpg';

export default function Card({ key, video }) {

    return (
        <div className="d-flex card me-3 my-2 bg-transparent">
            <Link to={video.videoUrl} style={{ textDecoration: "none" }}>
                <img src={thumbnail} className="card-img-top" alt="thumbnail" />
                <div className="card-body text-white">
                    <h5 className="card-title fw-bold fs-3">{video.title}</h5>
                    <p className="card-text fs-5">{video.desc}</p>
                    <small>{video.views} views . {format(video.createdAt)}</small>
                </div>
            </Link>
        </div>
    )
};