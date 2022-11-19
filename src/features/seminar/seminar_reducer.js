import { createSlice } from '@reduxjs/toolkit';
import { loadSeminarListFirebase } from './seminar';

export const seminarSlice = createSlice({
    name: 'seminar',
    initialState: {
        isSeminarListLoaded: false,
        seminarList: [],
    },
    reducers: {
        setSeminarList: (state, action) => {
            state.isSeminarListLoaded = true;
            state.seminarList = action.payload;
        },
    },
});

export const loadSeminarList = (dispatch) => {
    loadSeminarListFirebase().then((seminarList) => {
        dispatch(setSeminarList(seminarList));
    });
}

export const { setSeminarList } = seminarSlice.actions;

export const selectSeminarList = (state) => state.seminar.seminarList;
export const selectIsSeminarListLoaded = (state) => state.seminar.isSeminarListLoaded;

export default seminarSlice.reducer;