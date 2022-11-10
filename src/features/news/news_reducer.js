import { createSlice } from '@reduxjs/toolkit'

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

// Load News List From FireStore
export const loadNewsList = (dispatch) => {
    // TODO : Load News List From FireStore
    dispatch(
        setNewsList([])
    );
};

// Post(Upload) News List To FireStore (Maybe For WebSite Manager?)
export const postNewsList = (news) => (dispatch) => {
    // TODO : post News List To FireStore
    dispatch(
        setNewsList(news)
    );
}

export const { setNewsList } = newsSlice.actions;

export const selectNewsList = (state) => state.news.news;

export default newsSlice.reducer;

