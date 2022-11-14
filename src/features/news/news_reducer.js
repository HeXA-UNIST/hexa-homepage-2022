import { createSlice } from '@reduxjs/toolkit'
import { loadNewsFirebase, postNewNewsFirebase } from './news';

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
    },
    reducers: {
        setNewsList: (state, action) => {
            state.news = action.payload;
        },
    },
});

// Firebase에서 최신 순으로 number개의 News를 불러오고 state 갱신.
export const loadNewsList = (number) => (dispatch) => {
    loadNewsFirebase(number).then((data) => {
        dispatch(setNewsList(data));
    });
};

export const { setNewsList } = newsSlice.actions;

export const selectNewsList = (state) => state.news.news;

export default newsSlice.reducer;

