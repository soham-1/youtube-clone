import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { loginError, loginStart, loginSuccess, logout } from '../../redux/userSlice';

import axiosInstance from '../../utils/axiosInstance';
import './Signin.css';

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const u = useSelector(state => state.user.userInfo.username);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axiosInstance.post('auth/signin', {username, password});
            const userInfo = {
                userid: res.data._id,
                username: res.data.username,
                email: res.data.email,
            }
            dispatch(loginSuccess(userInfo));
            navigate('/');
        } catch (err) {
            console.log(err);
            dispatch(loginError());
        }
    };

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="col-lg-5 h-75 border border-primary p-3 d-flex justify-content-center" >
                <form className="col-lg-8 mt-5 text-white fs-5" onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username"
                        onChange={(e) => {setUsername(e.target.value)}} />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password"
                        onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <input className=" col-lg-5 btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;