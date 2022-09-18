import './Explore.css';
import thumbnail from '../../assets/images/default-video-thumbnail.jpg';

function ExploreCard() {
    return (
        <div className="explorecard d-flex col-lg-9 p-1 mx-5 mb-3">
            <div className='me-2'>
                <img src={thumbnail} alt="video" className='video' />
            </div>
            <div className='d-flex flex-column text-white'>
                <div className='fw-bold fs-5'>
                    Video title
                </div>
                <div className='mb-2'>
                    details
                </div>
                <div>
                    description
                </div>
            </div>
        </div>
    )
}

export default ExploreCard;