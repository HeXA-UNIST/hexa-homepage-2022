import { createSlice } from "@reduxjs/toolkit";
import { loadTechStackListFirebase } from "./tech_stack";

export const techStackSlice = createSlice({
    name: 'techStack',
    initialState: {
        isTechStackListLoaded: false,
        techStackList: [],
    },
    reducers: {
        setTechStackList: (state, action) => {
            state.isTechStackListLoaded = true;
            state.techStackList = action.payload;
        },
    },
});

export const loadTechStackList = (dispatch) => {
    loadTechStackListFirebase().then((techStackList) => {
        dispatch(setTechStackList(techStackList));
    });
}

export const { setTechStackList } = techStackSlice.actions;

export const selectTechStackList = (state) => state.techStack.techStackList;
export const selectIsTechStackListLoaded = (state) => state.techStack.isTechStackListLoaded;

export default techStackSlice.reducer;