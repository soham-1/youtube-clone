import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/youtube-logo-transparent.png';
import './Navbar.css';
import UploadVideo from '../UploadVideo/UploadVideo';

function Navbar() {
    const username = useSelector(state => state.user.userInfo.username);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link to='/' style={{ textDecoration: 'none', display: "inline-flex", alignItems: "center" }}>
                            <div><img src={logo} className="youtube-logo" alt="youtube-logo" /></div>
                            <div className="youtube-brand fw-bolder fs-4 d-flex align-items-center" id="youtube-brand">YouTube</div>
                        </Link>
                    </div>
                    <div className="col-lg-5" id="search-box-div">
                        <form className="col-lg-12 h-100">
                            <input type="text" className="col-lg-12 h-100" id="search-box" placeholder='Search' />
                        </form>
                    </div>
                    <div>
                        {
                            username === "" ?
                                (
                                    <Link to='/signin' style={{ textDecoration: 'none' }}>
                                        <div className="d-flex align-items-center sign-in p-1">
                                            <span id="sign-in-text">Sign In</span>
                                        </div>
                                    </Link>
                                ) :
                                (
                                    <div className="d-flex align-items-center fs-5 text-white p-1">
                                        <button id="sign-in-text" onClick={() => {setOpen(true)}}>Upload Video</button>
                                        <span id="sign-in-text">Welcome, {username}</span>
                                    </div>
                                )
                        }

                    </div>
                </div>
            </nav>
            {
                open && <><UploadVideo setOpen={setOpen}/></>
            }
        </div>
    )
}

export default Navbar;