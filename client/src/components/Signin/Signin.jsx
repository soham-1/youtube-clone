import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginError, loginStart, loginSuccess } from '../../redux/userSlice';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

import axiosInstance from '../../utils/axiosInstance';
import './Signin.css';

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axiosInstance.post('auth/signin', { username, password });
            const userInfo = {
                userid: res.data._id,
                username: res.data.username,
                email: res.data.email,
            }
            dispatch(loginSuccess(userInfo));
            navigate('/');
        } catch (err) {
            console.log(err.response);
            dispatch(loginError());
        }
    };

    const signInWithGoogle = () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                axiosInstance
                    .post("/auth/google", {
                        username: result.user.displayName,
                        email: result.user.email,
                        img: result.user.photoURL
                    })
                    .then((res) => {
                        dispatch(loginSuccess({userid: res._id, ...res.data}))
                    })
            })
            .catch(err => {
                console.log(err);
                dispatch(loginError());
            })
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="col-lg-5 h-75 border border-primary p-3 d-flex flex-column align-items-center" >
                <form className="col-lg-8 mt-5 text-white fs-5" onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username"
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password"
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <input className=" col-lg-5 btn btn-primary" type="submit" value="Submit" />
                    </div>
                </form>
                <div className="fs-3 text-white fw-bold my-3">OR</div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={signInWithGoogle}>Signin With Google</button>
                </div>
            </div>
        </div>
    )
}

export default Signin;