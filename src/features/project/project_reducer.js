import { createSlice } from '@reduxjs/toolkit'
import { firebaseAuth } from '../../app/firebase';
import { searchProjectListFirebase, searchProjectListByMemberFirebase, loadProjectDataFirebase } from './project';

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        isProjectListLoaded: false,
        projectList: [],
    },
    reducers: {
        setProjectList: (state, action) => {
            
            state.isProjectListLoaded = true;
            state.projectList = action.payload;
        },
        setIsProjectListLoaded: (state, action) => {
            state.isProjectListLoaded = action.payload;
        },
    },
});

export const { setProjectList, setIsProjectListLoaded} = projectSlice.actions;

// 검색어 포함해 프로젝트 데이터들을 불러온다.
// searchText가 null또는 ""이면 텍스트 검색하지 않는다.
// searchTechStackList가 null또는 []이면 techStack 필터링 하지 않는다.
export const loadProjectList = (searchText = null, searchTechStackList = null) => (dispatch) => {
    dispatch(setIsProjectListLoaded(false));
    searchProjectListFirebase(searchText, searchTechStackList).then((projectList) => {
        dispatch(setProjectList(projectList));
    });
}

// uid에 해당하는 맴버가 참여한 프로젝트 데이터들을 불러온다.
export const loadProjectListByMember = (uid) => (dispatch) => {
    dispatch(setIsProjectListLoaded(false));
    searchProjectListByMemberFirebase(uid).then((projectList) => {
        dispatch(setProjectList(projectList));
    });
}
export const loadProjectListById = (id) => (dispatch)=>{
    dispatch(setIsProjectListLoaded(false));
    loadProjectDataFirebase(id).then((project) =>{
        dispatch(setProjectList([project]))
    })
}
// User가 참여한 프로젝트 데이터들을 불러온다.
export const loadProjectListByUser = (dispatch) => {
    if(firebaseAuth.currentUser === null || firebaseAuth.currentUser === undefined) {
        return;
    }
    dispatch(setIsProjectListLoaded(false));
    const uid = firebaseAuth.currentUser.uid;
    searchProjectListByMemberFirebase(uid).then((projectList) => {
        dispatch(setProjectList(projectList));
    });
}


export const selectProjectList = (state) => state.project.projectList;
export const selectIsProjectListLoaded = (state) => state.project.isProjectListLoaded;

export default projectSlice.reducer;