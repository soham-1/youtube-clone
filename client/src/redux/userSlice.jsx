import { createSlice } from '@reduxjs/toolkit'

import { loadState, saveState } from '../utils/localStorage/userLocalStorage';

const nullState = {
    userInfo: {
        userid: "",
        username: "",
        email: "",
    },
    loading: false,
    error: false,
}
const initialState = loadState();

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.userInfo.userid = action.payload.userid;
            state.userInfo.username = action.payload.username;
            state.userInfo.email = action.payload.email;
            saveState(state);
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.user = nullState; // as a slice reducer responds to all dispatch even from different reducers so state also contains
            // all variables, to specifically reset a particular state use state.name of reducer
        }
    },
});

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;
export default userSlice.reducer;