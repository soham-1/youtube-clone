import React from 'react'
import './Card.css';
import thumbnail from '../../assets/images/default-video-thumbnail.jpg';

export default function Card() {
    return (
        <div className="d-flex card me-3 my-2 bg-transparent">
            <img src={thumbnail} className="card-img-top" alt="video" />
            <div className="card-body text-white">
                <h5 className="card-title fw-bold fs-3">Card title</h5>
                <p className="card-text fs-5">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <small>3 days ago</small>
            </div>
        </div>
    )
};