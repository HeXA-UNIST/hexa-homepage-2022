import { createSlice } from '@reduxjs/toolkit'
import { loadProjectListFirebase, postProjectDataFirebase, searchProjectListFirebase } from './project';

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectList: [],
    },
    reducers: {
        setProjectList: (state, action) => {
            state.projectList = action.payload;
        },
    },
});

export const { setProjectList } = projectSlice.actions;

export const loadProjectList = (searchText = null, searchTechStackList = null) => (dispatch) => {
    searchProjectListFirebase(searchText, searchTechStackList).then((projectList) => {
        dispatch(setProjectList(projectList));
    });
}

export const selectProjectList = (state) => state.project.projectList;

export default projectSlice.reducer;