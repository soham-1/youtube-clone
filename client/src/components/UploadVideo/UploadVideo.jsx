import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../utils/firebase/firebase';

import axiosInstance from '../../utils/axiosInstance';
import './UploadVideo.css';
import { resolvePath } from 'react-router';

const UploadVideo = ({ setOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [videoProgress, setVideoProgress] = useState(0);
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const submit = false;

    const userId = useSelector(state => state.user.userInfo.userid);

    const close = () => {
        setOpen(false);
    };

    const uploadFile = async (file, fileType) => {
        return new Promise((resolve, reject) => {
            const d = new Date();
            const prefix = d.getFullYear() + '_' + d.getMonth() + '_' + d.getDay() + '_' +
                d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

            const StorageRef = ref(storage, `${fileType}/${prefix}__${file.name}`);
            const uploadTask = uploadBytesResumable(StorageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    fileType === "videos" ?
                        setVideoProgress(progress) :
                        setThumbnailProgress(progress);
                    console.log(fileType + " upload progress is " + thumbnailProgress);
                },
                (err) => {
                    reject(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        if (fileType === "videos") {
                            setVideoUrl(downloadURL)
                        } else {
                            setThumbnailUrl(downloadURL);
                        }
                        resolve(downloadURL);
                    });
                }
            );
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const video = e.target.videoFile.files[0];
        const thumbnail = e.target.thumbnail.files[0];

        const urls = await Promise.all([
            uploadFile(video, 'videos'),
            uploadFile(thumbnail, 'images')
        ]);
        console.log("completed", videoUrl, thumbnailUrl);
        const Video_data = {
            "userId": userId,
            "title": title,
            "desc": description,
            "tags": tags,
            "videoUrl": urls[0],
            "imgUrl": urls[1]
        }
        await axiosInstance
            .post('/videos/', Video_data)
            .catch(err => {
                console.log(err);
            });

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

    return (
        <div className="uploadVideo">
            <div className="d-flex flex-column uploadForm p-3 col-lg-6 justify-content-center">
                <div className="ms-auto fw-bold fs-5" >
                    <a onClick={close} style={{ cursor: "pointer" }}>close</a>
                </div>
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter Video title" onChange={(e) => setTitle(e.target.value.trim())} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tags">Description</label>
                        <textarea className="form-control" id="description" placeholder="video description here" onChange={(e) => setDescription(e.target.value.trim())} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" id="title" aria-describedby="tagHelp" placeholder="Tag1, Tag2" onChange={handleTags} />
                        <small id="tagHelp" className="form-text text-muted">Separate tags by comma ( , )</small>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="thumbnail" className='me-3'>Thumbnail</label>
                        <input type="file" accept="image/*" className="form-control-file" id="thumbnail" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="vdieoFile" className='me-3'>Video</label>
                        <input type="file" accept="video/*" className="form-control-file" id="videoFile" required />
                        <span className="col-lg-2">
                            <div className="bg-primary" style={{ width: videoProgress }}></div>
                        </span>
                    </div>
                    <div className="d-flex justify-content-center mt-auto mb-2">
                        <button type="submit" className="btn btn-primary col-lg-5">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadVideo