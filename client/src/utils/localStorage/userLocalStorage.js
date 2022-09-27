let initialState = {
    userInfo: {
        userid: "",
        username: "",
        email: "",
    },
    loading: false,
    error: false,
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    }
    catch (error) {
        console.log(error);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    }
    catch (error) {
        return undefined;
    }
};