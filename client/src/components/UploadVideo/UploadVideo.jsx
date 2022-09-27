import { useEffect, useState } from 'react';
import './UploadVideo.css';

const UploadVideo = ({ setOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    const handleTags = (e) => {
        let tags = e.target.value.split(",");
        let ans = [];
        tags.forEach(tag => {
            ans.push(tag.trim());
        });
        setTags(ans);
    }

    useEffect(() => {
        // console.log(tags);
    });

    return (
        <div className="uploadVideo">
            <div className="d-flex uploadForm p-3 col-lg-6 justify-content-center">
                <form className="d-flex flex-column">
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter Video title" onChange={(e) => setTitle(e.target.value.trim())} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tags">Description</label>
                        <textarea className="form-control" id="description" placeholder="video description here" onChange={(e) => setDescription(e.target.value.trim())} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" id="title" aria-describedby="tagHelp" placeholder="Tag1, Tag2" onChange={handleTags}/>
                        <small id="tagHelp" className="form-text text-muted">Separate tags by comma ( , )</small>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="thumbnail" className='me-3'>Thumbnail</label>
                        <input type="file" accept="image/*" className="form-control-file" id="thumbnail" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="vdieoFile" className='me-3'>Video</label>
                        <input type="file" accept="video/*" className="form-control-file" id="videoFile" />
                    </div>
                    <div className="d-flex justify-content-center mt-auto mb-2">
                        <button type="submit" className="btn btn-primary col-lg-5" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadVideo