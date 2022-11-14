import { createSlice } from '@reduxjs/toolkit';
import { loadSeminarListFirebase } from './seminar';

export const seminarSlice = createSlice({
    name: 'seminar',
    initialState: {
        seminarList: [],
    },
    reducers: {
        setSeminarList: (state, action) => {
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

export default seminarSlice.reducer;