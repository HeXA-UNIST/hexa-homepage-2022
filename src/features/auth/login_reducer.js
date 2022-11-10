import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null, // Firebase Auth User instance
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
            if(!action.payload){
                state.user = null;
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// auth.js의 registerAuthStateChangedObserver에서 이 action들을 호출해 관리.
// 수동으로 이 action들을 dispatch할 일은 거의 없을 듯 싶다.
export const { setIsLoggedIn, setUser } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;

