import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import axiosInstance from '../../utils/axiosInstance';

function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        axiosInstance
            .get('/auth/logout')
            .then(res => {
                localStorage.removeItem('user');
                dispatch(logout());
                window.location.assign('/');
            })
    },);
}

export default Logout;