import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    info: {}
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            const { user_id: id, email } = action.payload;
            state.info.id = id;
            state.info.email = email;
            state.isAuthenticated = true;
        },
        setUserFromLocalStorage(state) {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                state.isAuthenticated = true;
                const { user_id: id, email } = user;
                state.info.id = id;
                state.info.email = email;
            } else {
                return state = initialState;
            }
        },
        logoutUser(state) {
            localStorage.removeItem('user');
            return state = initialState;
        }
    }
});

export const { setUser, setUserFromLocalStorage, logoutUser } = userSlice.actions;

export default userSlice.reducer;
